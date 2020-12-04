/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import { preprocess, getSentences, countPuncMarks, getWords, wordAnalyze } from '../utils/lang-vn';
import { totalWordCount, differentWord, numberofParagraphs, 
  numberofSentence, wordPerSentence, longWords, 
  wordFrequency, numberOfCharacterAll, numberOfCharacter, 
  charactersPerWord, keyWord, syllables,
  syllablesPerWord, differentWordCommon, totalWordCountWithoutCommon} from '../utils/english-analyze';

/* global document, Office, Word */

Office.onReady(info => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
  }
});

function switchLang(lang) {
  document.getElementById(lang).removeAttribute('hidden');
  document.getElementById(lang === 'en' ? 'vn' : 'en').setAttribute('hidden', 'true');
}

export async function run() {
  return Word.run(async context => {
    const docBody = context.document.body;
    context.load(docBody, ['text', 'paragraphs']);

    return context.sync().then(() => {
      const paragraphs = docBody.paragraphs.items;
      const parTokens = preprocess(paragraphs);
      const sentTokens = getSentences(parTokens);
      let words = [];
      for (const token of sentTokens) {
        words.push(...getWords(token));
      }
      const { charsCount, syllablesCount } = wordAnalyze(words);
      const lang = document.getElementById('lang-select').value;
      
      if (lang === '0') { // EN
        switchLang('en');
        document.getElementById('total-word-count').innerText = totalWordCount(docBody.paragraphs.items);
        document.getElementById('word-count-common').innerText = totalWordCountWithoutCommon(docBody.paragraphs.items);
        document.getElementById('different-word').innerText = differentWord(docBody.paragraphs.items);
        document.getElementById('different-word-common').innerText = differentWordCommon(docBody.paragraphs.items);
        document.getElementById('number-of-paragraphs').innerText = numberofParagraphs(docBody.paragraphs.items);
        document.getElementById('number-of-sentence').innerText = numberofSentence(docBody.paragraphs.items);
        document.getElementById('word-persentence').innerText = wordPerSentence(docBody.paragraphs.items);
        document.getElementById('number-of-characters-all').innerText = numberOfCharacterAll(docBody.paragraphs.items);
        document.getElementById('number-of-characters').innerText = numberOfCharacter(docBody.paragraphs.items);
        document.getElementById('characters-per-word').innerText = charactersPerWord(docBody.paragraphs.items);
        document.getElementById('syllables').innerText = syllables(docBody.paragraphs.items);
        document.getElementById('syllables-per-word').innerText = syllablesPerWord(docBody.paragraphs.items);
        // document.getElementById('keyword').innerText = keyWord(docBody.paragraphs.items);
        // document.getElementById('word-freq').innerText = wordFrequency(docBody.paragraphs.items);

      } else if (lang === '1') { // VN
        switchLang('vn');
        const wordsCount = words.length;
        const sentsCount = sentTokens.length;
        const parsCount = paragraphs.length;
        document.getElementById('0').innerText = charsCount;
        document.getElementById('1').innerText = wordsCount;
        document.getElementById('2').innerText = sentsCount;
        document.getElementById('3').innerText = parsCount;
        document.getElementById('4').innerText = countPuncMarks(docBody.text);
        document.getElementById('5').innerText = sentsCount / parsCount;
        document.getElementById('6').innerText = wordsCount / sentsCount;
        document.getElementById('7').innerText = charsCount / wordsCount;
        document.getElementById('8').innerText = syllablesCount;
        document.getElementById('9').innerText = syllablesCount / wordsCount;
      }
      
      return context.sync();
    });
  });
}
