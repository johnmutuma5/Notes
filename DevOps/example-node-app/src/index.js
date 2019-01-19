const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!! We\'re loving Docker');
});


app.listen(3000, () => console.log('listennin on port 3000'));
