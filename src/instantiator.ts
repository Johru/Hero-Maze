class Junk {
  name: string;
  nr: number;
  anotherProperty: string = 'alwaysthis';

  constructor(nr: number, name: string = 'default') {
    this.name = name;
    this.nr = nr;
  }
}
let namer: string = 'junker';
let listOfClass: any[] = [];
let firstJunk = new Junk(0);
listOfClass.push(firstJunk);

/*function nameator (i:number){
      let localNamer:string=(namer+i).toString();
    return localNamer;

  }*/

function instantiator(index: number) {
  let instance: Junk = new Junk(index);
  listOfClass.push(instance);
}

for (let i = 0; i < 10; i++) {
  instantiator(i);
}
console.log(listOfClass);
