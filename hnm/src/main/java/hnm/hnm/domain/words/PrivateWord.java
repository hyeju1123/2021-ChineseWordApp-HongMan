package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class PrivateWord {

    private Long privateWordId;

    private String chCharacter;

    private String intonation;

    private String story;

    private String savedGroup;

    private List<Meaning> meanings = new ArrayList<>();

    private Long email;
}
