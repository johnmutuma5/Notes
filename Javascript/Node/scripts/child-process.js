const { spawn } = require('child_process');

const child = spawn('ls', ['-a', '.']);

child.stdout.on('data', (data) => {
  console.log(data.toString());
});
