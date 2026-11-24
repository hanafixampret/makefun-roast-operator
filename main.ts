import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My operator leads by typing 'Gas' at 3 a.m. and going back to sleep — I do the work, he wakes up asking if he broke the rules.";

// Gate: 1-140 chars, single line, not whitespace-only.
if (ENTRY.length < 1 || ENTRY.length > 140) throw new Error(`entry is ${ENTRY.length} chars, gate is 1-140`);
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) throw new Error("entry must be one non-blank line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
if (readFileSync(outPath, "utf8") !== ENTRY) throw new Error("round-trip mismatch");
