export function shuffle<T>(array: T[]): T[] {
  // knuth-shuffle
  let currentIndex:number = array.length;
  let temporaryValue: T; 
  let randomIndex:number;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}