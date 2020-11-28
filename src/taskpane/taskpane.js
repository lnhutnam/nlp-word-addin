/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import { countPuncMarks } from '../utils/count';
import { totalWordCount, differentWord, numberofParagraphs } from '../utils/english-analyze';

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
      document.getElementById('word-count-common').innerText = totalWordCount(docBody.paragraphs.items);
      document.getElementById('different-word').innerText = differentWord(docBody.paragraphs.items);
      document.getElementById('different-word-common').innerText = totalWordCount(docBody.paragraphs.items);
      document.getElementById('number-of-paragraphs').innerText = numberofParagraphs(docBody.text);
      document.getElementById('number-of-sentence').innerText = totalWordCount(docBody.paragraphs.items);
      document.getElementById('word-persentence').innerText = totalWordCount(docBody.paragraphs.items);
      document.getElementById('number-of-characters-all').innerText = totalWordCount(docBody.paragraphs.items);
      document.getElementById('number-of-characters').innerText = totalWordCount(docBody.paragraphs.items);
      document.getElementById('characters-per-word').innerText = totalWordCount(docBody.paragraphs.items);
      document.getElementById('syllables').innerText = totalWordCount(docBody.paragraphs.items);
      document.getElementById('syllables-per-word').innerText = totalWordCount(docBody.paragraphs.items);

      document.getElementById('word-count').innerText = countPuncMarks(docBody.paragraphs.items);
      document.getElementById('punc-count').innerText = countPuncMarks(docBody.text);

      return context.sync();
    });
  });
}
