const { spawn } = require('child_process');
const path = require('path');

const child = spawn(process.execPath, [path.join(__dirname, 'child.js')], {
  stdio: 'inherit'
});

// child.stdout.on('data', (data) => {
//   console.error(data.toString());
// });

// child.stderr.on('data', (err) => {
//   throw err;
// })

// child.stdout.pipe(process.stdout)
// you can input data to stdin and it will be processed
// process.stdin.on('data', (data) => {
//   console.log(data.toString());
// });
