import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { 
  addLeetReplaceMod,
  addSeparatorMod,
  addCamelCaseMod,
} from './modifiers';
import { SEPARATORS } from '@/app/utils/consts';

export async function GET(request: Request) {
  // Get and parse parameters
  const url = new URL(request.url);
  const params = {
    count: Math.max(1, parseInt(url.searchParams.get('count') || '4', 10) || 4),
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
      entry.word = addLeetReplaceMod(entry.word);
    });
  }

  if (params.camelCase) {
    passphraseEntries.forEach((entry, index) => {
      if (index > 0) {
        entry.word = addCamelCaseMod(entry.word);
      } else {
        entry.word = entry.word.toLowerCase();
      }
    });
  }

  if (!checkIfSeparatorValid(params.separator)) {
    params.separator = 'none';
  }

  passphraseEntries.forEach((entry, index) => {
    if (index < passphraseEntries.length - 1) {
      passphrase += addSeparatorMod(entry.word, params.separator);
    } else {
      passphrase += entry.word;
    }
  });

  return NextResponse.json({ passphrase });
}

const checkIfSeparatorValid = (separator: string): boolean => {
  if (Object.keys(SEPARATORS).includes(separator)) {
    return true;
  } else if (separator.length === 1 && typeof separator === 'string') {
    return true;
  }

  return false;
}