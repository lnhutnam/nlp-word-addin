/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */


import { totalWordCount, differentWord, numberofParagraphs, 
  numberofSentence, wordPerSentence, longWords, 
  wordFrequency, numberOfCharacterAll, numberOfCharacter, 
  charactersPerWord, keyWord, syllables,
  syllablesPerWord, differentWordCommon, totalWordCountWithoutCommon, totalPuncMarks} from '../utils/english-analyze';
import Worker from 'worker-loader!../worker/worker';

/* global document, Office, Word */
let worker;
Office.onReady(info => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
    worker = new Worker();
  }
});

function switchLang(lang) {
  document.getElementById(lang).removeAttribute('hidden');
  document.getElementById(lang === 'en' ? 'vn' : 'en').setAttribute('hidden', 'true');
}

function runWorker(data, dom) {
  worker.postMessage(JSON.stringify(data));
  worker.onmessage = e => {
    const { resLettersCount, resCharsCount, resSyllablesCount, resPuncMarksCount, resWordsCount, resSentsCount, resParsCount } = e.data;
    dom.getElementById('0').innerText = resLettersCount;
    dom.getElementById('1').innerText = resCharsCount;
    dom.getElementById('2').innerText = resWordsCount;
    dom.getElementById('3').innerText = resSentsCount;
    dom.getElementById('4').innerText = resParsCount;
    dom.getElementById('5').innerText = resPuncMarksCount;
    dom.getElementById('6').innerText = resSentsCount / resParsCount;
    dom.getElementById('7').innerText = resWordsCount / resSentsCount;
    dom.getElementById('8').innerText = resLettersCount / resWordsCount;
    dom.getElementById('9').innerText = resSyllablesCount;
    dom.getElementById('10').innerText = resSyllablesCount / resWordsCount;
  };
}

export async function run() {
  return Word.run(async context => {
    const docBody = context.document.body;
    context.load(docBody, ['text', 'paragraphs']);

    return context.sync().then(() => {
      const paragraphs = docBody.paragraphs.items;
      const text = docBody.text;
      docBody.untrack();

      const lang = document.getElementById('lang-select').value;
      if (lang === '0') { // EN
        switchLang('en');
        document.getElementById('total-word-count').innerText = totalWordCount(paragraphs);
        document.getElementById('word-count-common').innerText = totalWordCountWithoutCommon(paragraphs);
        document.getElementById('different-word').innerText = differentWord(paragraphs);
        document.getElementById('different-word-common').innerText = differentWordCommon(paragraphs);
        document.getElementById('number-of-paragraphs').innerText = numberofParagraphs(paragraphs);
        document.getElementById('number-of-sentence').innerText = numberofSentence(paragraphs);
        document.getElementById('word-persentence').innerText = wordPerSentence(paragraphs);
        document.getElementById('number-of-characters-all').innerText = numberOfCharacterAll(paragraphs);
        document.getElementById('number-of-characters').innerText = numberOfCharacter(paragraphs);
        document.getElementById('characters-per-word').innerText = charactersPerWord(paragraphs);
        document.getElementById('syllables').innerText = syllables(paragraphs);
        document.getElementById('syllables-per-word').innerText = syllablesPerWord(paragraphs);
        document.getElementById('punc-count').innerText = totalPuncMarks(paragraphs);
      } else if (lang === '1') { // VN
        switchLang('vn');
        runWorker({paragraphs, text}, document);
      }

      return context.sync();
    });
  });
}
