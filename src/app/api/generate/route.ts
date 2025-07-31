import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { 
  leetReplace,
  addSeparator,
  useCamelCase,
} from './modifiers';

export async function GET(request: Request) {
  // Get and parse parameters
  const url = new URL(request.url);
  const params = {
    count: parseInt(url.searchParams.get('count') || '4', 10),
    leet: url.searchParams.get('leet') === 'true',
    separator: url.searchParams.get('separator') || 'none',
    camelCase: url.searchParams.get('camelCase') === 'true',
  }

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

  const passphraseEntries = Array.from({ length: params.count }, () => {
    return entries[Math.floor(Math.random() * entries.length)];
  });

  // Apply modifiers
  let passphrase: string = '';

  if (params.leet) {
    passphraseEntries.forEach(entry => {
      entry.word = leetReplace(entry.word);
    });
  }

  if (params.camelCase) {
    passphraseEntries.forEach(entry => {
      entry.word = useCamelCase(entry.word);
    });
  }

  passphraseEntries.forEach((entry, index) => {
    if (index < passphraseEntries.length - 1) {
      passphrase += addSeparator(entry.word, params.separator);
    } else {
      passphrase += entry.word;
    }
  });

  return NextResponse.json({ passphrase });
}