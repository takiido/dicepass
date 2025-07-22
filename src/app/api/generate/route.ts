import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const countParam = url.searchParams.get('count');
  const count = countParam ? parseInt(countParam, 10) : 4;

  const wordlistPath = path.join(process.cwd(), 'data', 'wordlist.txt');
  const content = fs.readFileSync(wordlistPath, 'utf8');

  // Parse each line into { code, word }
  const entries = content.split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [code, ...wordParts] = line.split(/\s+/);
      const word = wordParts.join(' ');
      return { code, word };
    });

  // Randomly select `count` entries
  const passphraseEntries = Array.from({ length: count }, () => {
    return entries[Math.floor(Math.random() * entries.length)];
  });

  // Build the passphrase object: { code: word, ... }
  const passphrase: Record<string, string> = {};
  passphraseEntries.forEach(entry => {
    passphrase[entry.code] = entry.word;
  });

  return NextResponse.json({ passphrase });
}