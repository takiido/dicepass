import { LETTERS_TO_NUMBERS, SEPARATORS } from "@/app/utils/consts";

export const leetReplace = (input: string): string => {
  return input
    .split('')
    .map(char => {
      const lowerChar = char.toLowerCase();
      if (lowerChar in LETTERS_TO_NUMBERS) {
        // Tell TS this key is valid
        return LETTERS_TO_NUMBERS[lowerChar as keyof typeof LETTERS_TO_NUMBERS];
      }
      return char;
    })
    .join('');
}

export const addSeparator = (input: string, separator: string): string => {
  if (separator in SEPARATORS) {
    return input + SEPARATORS[separator as keyof typeof SEPARATORS];
  }
  return input;
}

export const useCamelCase = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
}