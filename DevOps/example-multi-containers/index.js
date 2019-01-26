const express = require('express');
const redis = require('redis');


const app = express();
const client = redis.createClient({
  host: 'redis-server'
});

client.set('visits', 0);

app.get('/', async (req, res) => {
  return client.get('visits', (err, value) => {
    client.set('visits', parseInt(value) + 1)
    return res.status(200).send('Number of visits is: ' + value);
  });
})


app.listen(8081, () => console.log('Listenning on PORT 8081'));
