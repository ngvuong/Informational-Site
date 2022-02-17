const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const path = req.url;
  let file = '';
  switch (path) {
    case '/':
      file = 'index.html';
      break;
    case '/about':
      file = 'about.html';
      break;
    case '/contact':
      file = 'contact.html';
      break;
    default:
      file = '404.html';
      break;
  }
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

const PORT = process.env.port || 3000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
