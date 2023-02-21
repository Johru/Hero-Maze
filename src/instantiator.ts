const list: number[][] = [
  [1, 1],
  [2, 2],
];
let x1 = list[0][1];
list[0][1] = 99;
list[0][0] = 99;
console.log(list);
console.log(x1);
