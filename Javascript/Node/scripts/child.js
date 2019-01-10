process.stdout.write('Hello Lazuli');
let sum = 0;

for(let i=0; i<10e9; ++i)
  sum += i;

process.stdout.write(sum.toString());
