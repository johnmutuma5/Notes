const { Transform } = require('stream');

const toUpperTransform = new Transform({
  transform(chunk, encoding, callback) {
    const trasnformed = chunk.toString().toUpperCase();
    callback(null, trasnformed);
  }
});

process.stdin.pipe(toUpperTransform).pipe(process.stdout);
