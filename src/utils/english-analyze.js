import { TokenizerEn } from '@nlpjs/lang-en';

export function totalWordCount(paragraphs) {
    const tokenizer = new TokenizerEn();
    let count = 0;
    for (const paragraph of paragraphs) {
        count += tokenizer.tokenize(paragraph.text).length;
    }
    return count;
}

export function differentWord(paragraphs) {
    const tokenizer = new TokenizerEn();
    let count = 0;
    var paraSet = new Set();
    for (const paragraph of paragraphs) {
        tokenizer.tokenize(paragraph.text).forEach(element => {
            paraSet.add(element)
        });
    }
    return paraSet.size;
}

export function differentWordCommon(paragraphs) {
    return 0;
}

export function numberofParagraphs(text){
    return text.split('\n').length;
}

export function numberofSentence(paragraphs){
    return 0;
}

export function wordPerSentence(sentence){
    return 0;
}

export function numberOfCharacterAll(text){
    return 0;
}

export function numberOfCharacter(text) {
    return 0;
}





