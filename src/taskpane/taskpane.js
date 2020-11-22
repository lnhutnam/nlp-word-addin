/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import { countWords, countPuncMarks } from '../utils/count';

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
      
      document.getElementById('word-count').innerText = countWords(docBody.paragraphs.items);
      document.getElementById('punc-count').innerText = countPuncMarks(docBody.text);

      return context.sync();
    });
  });
}
