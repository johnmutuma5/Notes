// dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// the server should respond to all requests with a string
const callback = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  // remove beginning and trailing slashes from the path
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // Get the query string object
  const qeuryStringObject = parsedUrl.query;
  // Get the request method
  const METHOD = req.method;
  // Get the headers
  const headers = req.headers;
  // parse the request payload
  const decoder = new StringDecoder('utf8');
  let requestData = '';
  req.on('data', data => {
    requestData += decoder.write(data);
  });
  req.on('end', () => {
    requestData += decoder.end();
    console.log(requestData, 'ended');
  })

  res.end('Hello world\n');
  console.log('new connection on: ', trimmedPath, 'with method: ', METHOD);
}

const server = http.createServer(callback);

// server can start listenning on a PORT
const PORT = 3000;
server.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}`);
});
