export function isUpperCase(letter: string) {
  return letter.toUpperCase() === letter;
}

export function splitWord(text: string) {
  if (text.includes(' ')) return [text];
  if (text.includes('_') && text.includes('-')) return text.split('_').join('-').split('-');
  if (text.includes('-')) return text.split('-');
  if (text.includes('_')) return text.split('_');

  let tmpWord = '';
  let res: string[] = [];
  let i = 0;
  while (i < text.length) {

    const letter = text[i]
    tmpWord += letter;
    if (!isUpperCase(letter) && i + 1 < text.length && isUpperCase(text[i + 1]) ||
      isUpperCase(letter) && i - 1 >= 0 && isUpperCase(text[i - 1]) && i + 1 < text.length && !isUpperCase(text[i + 1])
    ) {
      res.push(tmpWord);
      tmpWord = '';
    }
    i++;
  }
  res.push(tmpWord);

  return res;
}