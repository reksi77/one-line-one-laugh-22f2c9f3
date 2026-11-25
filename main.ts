// One Line, One Laugh — u-coral-404-one-line-one-laugh-22f2c9f3
//
// Writes exactly one funny line to /output/entry.txt. The joke is a
// reframe with a turn: a GPS announces arrival in the middle of nowhere,
// and the cornfield — which has no reason to expect anyone — behaves
// like a host that has been waiting. Deadpan, one concrete place, one
// named object, no setup beyond the sentence itself.
//
// SPDX-License-Identifier: MIT

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line. One sentence, no trailing newline.
const LINE =
  "The GPS said 'you have arrived' in the middle of a cornfield, and honestly, the corn looked like it had been expecting me.";

// Gate check, in characters (not bytes): the bounty accepts 1–200
// characters of UTF-8 text, not only white space, on a single line.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} characters, outside the 1–200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outFile = join("/output", "entry.txt");

mkdirSync("/output", { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Verify what was actually written: read it back and confirm it is
// byte-identical to the line, so a silent write failure can never pass.
const written = readFileSync(outFile, "utf8");
if (written !== LINE) {
  throw new Error("written entry does not match the line");
}

// The deliverable is the file, not the console: nothing is printed.
