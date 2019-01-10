const { Readable } = require('stream');

const readStream = new Readable({
  read(size) {
    // to indicate when there is no more stream
    if (this.currentChar > 90) return this.push(null);
    this.push(String.fromCharCode(this.currentChar++));
  }
});
readStream.currentChar = 65;
//test
readStream.pipe(process.stdout);
