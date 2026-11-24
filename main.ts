// A "The Houseplant Out-of-Office" entry (Node 22, standard library
// only): its auto-reply line is the entry.txt beside this file, and the
// program copies it to /output/entry.txt. The gate takes UTF-8 text of
// 1 to 120 characters that is not only white space, and the judge reads
// exactly the bytes copied, so write no line end you do not mean to
// show. The program checks the line is inside the gate before copying,
// and fails loudly instead of shipping an invalid entry.
//
// The line (96 characters): a desk plant that has been ignored since
// March answers its owner's out-of-office with a revenge twist — it
// lives on the desk, it kept the receipt of every ignored day, and
// today it returns the favour. No "please water me" plea, no cactus
// cover, no photosynthesis pun: the plant's own neglected life drives
// the joke, and the punch lands on the last four words.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const entry = readFileSync(new URL('./entry.txt', import.meta.url), 'utf8');
if (entry.length < 1 || entry.length > 120 || !entry.trim()) {
  throw new Error(`entry.txt must be 1-120 non-blank characters, got ${entry.length}`);
}
if (/[\r\n]/.test(entry)) {
  throw new Error('entry.txt must be a single line: the judge reads one auto-reply, not a paragraph');
}
copyFileSync(new URL('./entry.txt', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.txt'));
