var http = require('http');
var os = require('os');
// var fileSystem = require('fs');

var server = http.createServer(function (req, resp) {
	var contentType = 'text/html';

	var dateObj = new Date();
	var year = dateObj.getUTCFullYear();
	var month = dateObj.getUTCMonth();
	var day = dateObj.getUTCDate();

	var datformatted = "" + year + month + day;
	var show = "OS: " + os.type() + " " + os.release() + " Image: v2\n Xendit - Trial - Ariz - 20200320 - " + datformatted

	resp.writeHead(200, { 'Content-Type': contentType });
	resp.write(show);
	resp.end();
});

server.listen(8080);