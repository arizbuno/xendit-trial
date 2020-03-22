var exec = require('child_process').exec;
var http = require('http');
var os = require('os');

var server = http.createServer(function (req, resp) {
	var contentType = 'text/html';

	var dateObj = new Date();
	var year = dateObj.getUTCFullYear();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();

	mem = exec("cat /sys/fs/cgroup/memory/memory.usage_in_bytes", function (err, memory, stderr) {
		if (err) {
			console.log(stderr);
			console.log('Reading Memory Error')
		}
		cpu = exec("cat /sys/fs/cgroup/cpuacct/cpuacct.usage", function (err, cpu, stderr) {
			if (err) {
				console.log(stderr);
				console.log('Reading CPU Usage Error')
			}
			var datformatted = "" + year + month + day;
			var show = "OS: " + os.type() + " " + os.release() + "<br>Image: v3<br>Xendit - Trial - Ariz - 20200320 - " + datformatted + "<br>Mem: " + memory + "bytes<br>CPU: " + cpu + " nanosecond"

			resp.writeHead(200, { 'Content-Type': contentType });
			resp.write(show);
			resp.end();
		});
	});
});

server.listen(8080);
