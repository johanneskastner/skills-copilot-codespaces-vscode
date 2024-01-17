// Create web server
// Create a web server that can respond to requests for /comments.json
// with a JSON-encoded array of comments taken from the file comments.json.
// Assume comments.json is an array of objects, each with a "name" and a
// "comment" property. Make sure to set the Content-Type header to
// application/json in your response.
// -----------------------------------------------------------------------------

var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url);
  var pathname = urlObj.pathname;
  var query = urlObj.query;
  var filename = pathname.slice(1) + '.json';
  console.log('filename: ' + filename);

  fs.exists(filename, function(exists) {
    if (!exists) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('File not found');
      return;
    }

    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data);
    });
  });
});

server.listen(8000);