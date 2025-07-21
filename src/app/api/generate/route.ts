import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  // Get the word count from the request params
  const url = new URL(request.url);
  const countParam = url.searchParams.get('count');
  const count = countParam ? parseInt(countParam, 10) : 4;

  // Read the wordlist from the data folder
  const wordlistPath = path.join(process.cwd(), 'data', 'wordlist.txt');
  const content = fs.readFileSync(wordlistPath, 'utf8');
  const words = content.split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  // Generate a passphrase with random words
  const passphrase = Array.from({ length: count }, () => {
    return words[Math.floor(Math.random() * words.length)];
  }).join(' ');

  // Return the passphrase as a JSON response
  return NextResponse.json({ passphrase });
}

