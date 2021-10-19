import flask
from flask import Flask, request, render_template
from tensorflow.keras.models import load_model
import numpy as np
import cv2

app = Flask(__name__)

@app.route("/")
@app.route("/index")
def index():
    return flask.render_template('index.html')

@app.route("/predict", methods=['POST'])
def make_prediction():
    if request.method == 'POST':
        file = request.files['image']

        if not file:
            return render_template('index.html', label="No Files")

        npimg = np.fromfile(file, np.uint8)
        img = cv2.cvtColor(cv2.imdecode(npimg, cv2.IMREAD_COLOR), cv2.COLOR_RGB2GRAY)
        img = cv2.resize(img, dsize=(64, 64)) / 255.0

        charset = "abcdefghijklnmopqrstuvwxyzāáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ"

        expanded = np.expand_dims(img, 2)
        expanded = np.expand_dims(expanded, 0)
        res = model.predict(expanded)[0]
        argRes = res.argsort()
        top10Res = argRes[16:]
        top10List = []
        for element in np.flip(top10Res):
            print("Predict result: ", charset[element])
            top10List.append(charset[element])

        return ''.join(top10List)

if __name__ == '__main__':
    model = load_model('./pinyin_model.h5')
    app.run(host='0.0.0.0', port=8000, debug=True)