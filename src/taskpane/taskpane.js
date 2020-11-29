/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import { countPuncMarks } from '../utils/count';
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


export async function run() {
  return Word.run(async context => {
    let docBody = context.document.body;
    context.load(docBody, ['text', 'paragraphs']);
    return context.sync().then(() => {
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
      document.getElementById('keyword').innerText = keyWord(docBody.paragraphs.items);
      document.getElementById('word-freq').innerText = wordFrequency(docBody.paragraphs.items);
      return context.sync();
    });
  });
}
