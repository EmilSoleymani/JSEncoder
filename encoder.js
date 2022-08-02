/*
    Code adapted from https://github.com/LowLevelJavaScript/JavaScript-Is-Weird
*/

import { readFile, writeFile } from 'fs';

// Get constants 0 and 1 from encoded char set
const zero = '+[]';
const one = '+!![]';

// Get any natural number from encoded char set
const number = n => {
  if (n === 0) return zero;
  return Array.from({length: n}, () => one).join(' + ');
}

// Map any char to string of chars from encoded char set
const map = {};

// Convert any string to string of chars from encoded char set
const fromString = s =>s.split('').map(x => {
  if (!(x in map)) {
    // If this char wasn't already in map, add it
    const charCode = x.charCodeAt(0);
    return `([]+[])[${fromString('constructor')}][${fromString('fromCharCode')}](${number(charCode)})`;
  }
  return map[x];
}).join('+');

map.a = `(+{}+[])[${number(1)}]`;
map.b = `({}+[])[${number(2)}]`;
map.o = `({}+[])[${number(1)}]`;
map.e = `({}+[])[${number(4)}]`;
map.c = `({}+[])[${number(5)}]`;
map.t = `({}+[])[${number(6)}]`;
map[' '] = `({}+[])[${number(7)}]`;
map.f = `(![]+[])[${number(0)}]`;
map.s = `(![]+[])[${number(3)}]`;
map.r = `(!![]+[])[${number(1)}]`;
map.u = `(!![]+[])[${number(2)}]`;
map.i = `((+!![]/+[])+[])[${number(3)}]`;
map.n = `((+!![]/+[])+[])[${number(4)}]`;
map.S = `([]+([]+[])[${fromString('constructor')}])[${number(9)}]`;
map.g = `([]+([]+[])[${fromString('constructor')}])[${number(14)}]`;
map.p = `([]+(/-/)[${fromString('constructor')}])[${number(14)}]`;
map['\\'] = `(/\\\\/+[])[${number(1)}]`;
map.d = `(${number(13)})[${fromString('toString')}](${number(14)})`;
map.h = `(${number(17)})[${fromString('toString')}](${number(18)})`;
map.m = `(${number(22)})[${fromString('toString')}](${number(23)})`;
map.C = `((()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']}))[${number(2)}]`;

const compile = code => `(()=>{})[${fromString('constructor')}](${fromString(code)})()`;

const ARGS = process.argv.length

if(ARGS < 3 || ARGS > 4){
    console.log("Error: Incorrect number of arguments");
} else {
    readFile(process.argv[2], 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        
        let outputData = compile(data)
        let outputPath = (ARGS === 3) ? process.argv[2].split(".")[0]+"_encoded.js" : process.argv[3]

        writeFile(outputPath, outputData, err => {
            if (err) {
              console.error(err);
            }
        });
    });
}