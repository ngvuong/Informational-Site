const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const pathName = req.url;
  let file = '';
  switch (pathName) {
    case '/':
      file = 'index.html';
      break;
    case '/about':
      file = 'about.html';
      break;
    case '/contact':
      file = 'contact.html';
      break;
    case '/styles.css':
      file = 'styles.css';
      break;
    default:
      file = '404.html';
      break;
  }
  const extName = path.extname(pathName);

  let contentType = 'text/html';
  if (extName === '.css') {
    contentType = 'text/css';
  }

  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      fs.readFile('404.html', (err, data) => {
        if (err) throw err;
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = process.env.port || 3000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
