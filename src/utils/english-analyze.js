var nlp = require( 'wink-nlp-utils' );
const keyword_extractor = require("keyword-extractor");
const syllable = require('syllable');
const commonWord = require('./english-common-word');

export function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function (w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;
}

// Text Statistics
export function totalWordCount(paragraphs) {
    let count = 0;
    for (const paragraph of paragraphs) {
        count += nlp.string.tokenize0(paragraph.text).length;
    }
    return count;
}

export function totalPuncMarks(paragraphs) {
    let count = 0;
    for (const paragraph of paragraphs) {
        let words = nlp.string.tokenize(paragraph.text);
        for (let word of words){
            if (word.tag === 'punctuation'){
                count = count + 1;
            }
        }
    }
    return count;
}

export function totalWordCountWithoutCommon(paragraphs) {
    let count = 0;
    for (const paragraph of paragraphs) {
        nlp.string.tokenize0(paragraph.text).forEach(element => {
            if (!commonWord.engCommonWord.includes(element.value)) {
                count += 1;
            }
        });
    }
    return count;
}

export function differentWord(paragraphs) {
    var paraSet = new Set();
    for (const paragraph of paragraphs) {
        nlp.string.tokenize0(paragraph.text).forEach(element => {
            paraSet.add(element.value);
        });
    }
    return paraSet.size;
}

export function differentWordCommon(paragraphs) {
    var paraSet = new Set();
    for (const paragraph of paragraphs) {
        nlp.string.tokenize0(paragraph.text).forEach(element => {
            if (!commonWord.engCommonWord.includes(element.value)) {
                paraSet.add(element.value);
            }
        });
    }
    return paraSet.size;
}

export function numberofParagraphs(paragraphs) {
    let count = 0;
    for (const paragraph of paragraphs) {
        count += paragraph.text.split('\n').length;
    }
    return count;
}

export function numberofSentence(paragraphs) {
    let count = 0;
    for (const paragraph of paragraphs) {
        count += nlp.string.sentences(paragraph.text).length;
    }
    return count;
}

export function wordPerSentence(paragraphs) {
    return totalWordCount(paragraphs) / numberofSentence(paragraphs);
}

export function numberOfCharacterAll(paragraphs) {
    let count = 0;
    for (const paragraph of paragraphs) {
        count += paragraph.text.length;
    }
    return count;
}

export function numberOfCharacter(paragraphs) {
    let count = 0;
    for (const paragraph of paragraphs) {
        let text = paragraph.text;
        if (text !== null) {
            for (const char of text) {
                if (char.match(/[a-zA-Z]/g)) {
                    count += 1;
                }
            }
        }
    }
    return count;
}

export function charactersPerWord(paragraphs) {
    return numberOfCharacter(paragraphs) / totalWordCount(paragraphs);
}

export function syllables(paragraphs) {
    let count = 0;
    for (const paragraph of paragraphs) {
        nlp.string.tokenize0(paragraph.text).forEach(element => {
            count += syllable(element);
        });
    }
    return count;
}

export function syllablesPerWord(paragraphs) {
    return syllables(paragraphs) / totalWordCount(paragraphs);
}

export function keyWord(paragraphs) {
    let result = "";
    var extraction_result;
    for (const paragraph of paragraphs) {
        extraction_result = keyword_extractor.extract(paragraph.text, {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: false

        });
        result += JSON.stringify(extraction_result) + "\n";
    }
    return result;
}

// Readability
export function hardWords(paragraphs) {
    return 0;
}

export function longWords(paragraphs) {
    let tokenizer = new natural.WordTokenizer();
    let longWordSet = new Set();
    for (const paragraph of paragraphs) {
        tokenizer.tokenize(paragraph.text).forEach(element => {
            if (element.length > 6) {
                longWordSet.add(element);
            }
        });
    }
    return longWordSet.size;
}

// Word Frequency
export function wordFrequency(paragraphs) {
    let result = "String ------------- Count\n";
    for (const paragraph of paragraphs) {
        let freq = wordFreq(paragraph.text);
        Object.keys(freq).sort().forEach(function (word) {
            result += word + "-------------" + freq[word] + "\n";
        });
    }
    return result;
}


