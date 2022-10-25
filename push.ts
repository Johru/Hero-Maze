let list: number[] = [];
let listX: number = 0;
let listY: number = 0;
let multiList: number[][] = [];
//let indexer: number = 0;
for (let i = 0; i < 15; i++) {
  multiList.push([i, -i]);
}
for (let i = 0; i < 15; i++) {
  listX = i;
  listY = -i;
  list.push(listX);
  list.push(listY);
}

function findCoordinates(x: number, y: number) {
  for (let i = 0; i < list.length; i += 2) {
    if (list[i] == x && list[i + 1] == y) return true;
  }
  return 'Not found.';
}

function findMultiCoordinates(x: number, y: number) {
  for (let i = 0; i < list.length; i += 1) {
    if (multiList[i][0] == x && multiList[i][1] == y) return true;
  }
  return 'Not found.';
}
function findBySubaarray(x: number, y: number) {
  for (let i = 0; i < multiList.length; i += 1) {
    if (multiList[i] == [x, y]) return true;
   }
   return 'Not found.';
}
//console.log(list);
//console.log(multiList);
console.log(findCoordinates(3, -3));
console.log(findMultiCoordinates(3, -3));
console.log(findBySubaarray(3, -3));
console.log(multiList[3].join(','));
console.log('3,-3');
  console.log(multiList[3].toString()==[3,-3].toString());
//console.log(findBySubaarray(3, -3));
