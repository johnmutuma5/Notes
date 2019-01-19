process.on('message', name => {
  process.send(`Hello ${name}`);
});
