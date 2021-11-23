
import tensorflow as tf
import base64
import io
import numpy as np
import soundfile as sf


def init(tacotron2, fastspeech2, mb_melgan, processor, word):

    if len(word) == 1:
        mels, audios = do_synthesis(processor, word, fastspeech2, mb_melgan, "FASTSPEECH2", "MB-MELGAN")
    else:
        mels, alignment_history, audios = do_synthesis(processor, word, tacotron2, mb_melgan, "TACOTRON", "MB-MELGAN")

    scaled = np.int16(audios/np.max(np.abs(audios)) * 23000)
    file_in_memory = io.BytesIO()
    sf.write(file_in_memory, scaled, 23000, format="wav")
    file_in_memory.seek(0)
    encode_output = base64.b64encode(file_in_memory.read())

    return encode_output


def do_synthesis(processor, input_text, text2mel_model, vocoder_model, text2mel_name, vocoder_name):
  input_ids = processor.text_to_sequence(input_text, inference=True)

  # text2mel part
  if text2mel_name == "TACOTRON":
    _, mel_outputs, stop_token_prediction, alignment_history = text2mel_model.inference(
        tf.expand_dims(tf.convert_to_tensor(input_ids, dtype=tf.int32), 0),
        tf.convert_to_tensor([len(input_ids)], tf.int32),
        tf.convert_to_tensor([0], dtype=tf.int32)
    )
  elif text2mel_name == "FASTSPEECH2":
    mel_before, mel_outputs, duration_outputs, _, _ = text2mel_model.inference(
        tf.expand_dims(tf.convert_to_tensor(input_ids, dtype=tf.int32), 0),
        speaker_ids=tf.convert_to_tensor([0], dtype=tf.int32),
        speed_ratios=tf.convert_to_tensor([1.0], dtype=tf.float32),
        f0_ratios=tf.convert_to_tensor([1.0], dtype=tf.float32),
        energy_ratios=tf.convert_to_tensor([1.0], dtype=tf.float32),
    )
  else:
    raise ValueError("Only TACOTRON, FASTSPEECH2 are supported on text2mel_name")

  # vocoder part
  if vocoder_name == "MB-MELGAN":
    # tacotron-2 generate noise in the end symtematic, let remove it :v.
    if text2mel_name == "TACOTRON":
      remove_end = 1024
    else:
      remove_end = 1
    audio = vocoder_model.inference(mel_outputs)[0, :-remove_end, 0]
  else:
    raise ValueError("Only MB_MELGAN are supported on vocoder_name")

  if text2mel_name == "TACOTRON":
    return mel_outputs.numpy(), alignment_history.numpy(), audio.numpy()
  else:
    return mel_outputs.numpy(), audio.numpy()
