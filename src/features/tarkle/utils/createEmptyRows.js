export function createEmptyRows(rowCount, wordLength) {
  return Array.from({ length: rowCount }, () => ({
    letters: Array.from({ length: wordLength }, () => ''),
    states: Array.from({ length: wordLength }, () => 'empty'),
  }))
}
