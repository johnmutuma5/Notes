// let memo = {
//   0: 0,
//   1: 1
// };
//
// function fib (n) {
//
//   if(memo[n] === undefined){
//     memo[n] = fib(n-1) + fib(n-2);
//     return memo[n]
//   }
//
//   return memo[n]
// }
//
// console.log(fib(500));


let prev = 0, curr = 1;


asyncFetchPrevAndCurrValues = (n) => (
  new Promise(res => {
    if (n === 1)
      [prev, curr] = [undefined, 0];

    setTimeout(() => res([prev, curr]), 100);
  })
);


function* fibGen(n) {
  const pos = 1;

  for(let i=pos; i < n; ++i) {
    [prev, curr] = yield asyncFetchPrevAndCurrValues(n);
    [prev, curr] = [curr, prev + curr];
  }
}


function runFibGen(gen=fibGen(50), args, fibs=[0]) {
  let item = gen.next(args);

  if(!item.done) {
    item.value.then(
      res => {
        fibs = fibs.concat([res[1]]);
        runFibGen(gen, res, fibs)
      }
    );

  } else
    console.log(fibs);
}

runFibGen();


// 0112358
