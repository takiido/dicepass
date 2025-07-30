import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { leetReplace, addSeparator } from './modifiers';

export async function GET(request: Request) {
  // Get parameters
  const url = new URL(request.url);
  const countParam = url.searchParams.get('count');
  const leetParam = url.searchParams.get('leet');
  const separatorParam = url.searchParams.get('separator');

  // Parse parameters
  const count = countParam ? parseInt(countParam, 10) : 4;
  const leet = leetParam ? leetParam === 'true' : false;
  const separator = separatorParam ? separatorParam : 'none';

  // Read wordlist
  const wordlistPath = path.join(process.cwd(), 'data', 'wordlist.txt');
  const content = fs.readFileSync(wordlistPath, 'utf8');

  const entries = content.split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [code, ...wordParts] = line.split(/\s+/);
      const word = wordParts.join(' ');
      return { code, word };
    });

  const passphraseEntries = Array.from({ length: count }, () => {
    return entries[Math.floor(Math.random() * entries.length)];
  });

  // Apply modifiers
  let passphrase: string = '';

  if (leet) {
    passphraseEntries.forEach(entry => {
      entry.word = leetReplace(entry.word);
    });
  }

  passphraseEntries.forEach((entry, index) => {
    if (index < passphraseEntries.length - 1) {
      passphrase += addSeparator(entry.word, separator);
    } else {
      passphrase += entry.word;
    }
  });

  return NextResponse.json({ passphrase });
}