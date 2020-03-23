var exec = require('child_process').exec;
var http = require('http');
var os = require('os');
const mariadb = require('mariadb');

var server = http.createServer(function (req, resp) {
	var contentType = 'text/html';
	var path = req.url;
	if (path) {
		if (path.endsWith(".svg")) {
			contentType = 'image/svg+xml';
		} else if (path.endsWith(".css")) {
			contentType = 'text/css';
		}
	}
	console.log("request path:", path, " contentType:", contentType);

	var dateObj = new Date();
	var year = dateObj.getUTCFullYear();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	var datformatted = "" + year + month + day;

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
			var show = "OS: " + os.type() + " " + os.release() + "<br>Image: v3<br>Xendit - Trial - Ariz - 20200320 - " + datformatted + "<br>Mem: " + memory + "bytes<br>CPU: " + cpu + " nanosecond"

			resp.writeHead(200, { 'Content-Type': contentType });
			resp.write(show);
			resp.end();
		});
	});

	const pool = mariadb.createPool({
		host: process.env.MARIADB_HOST,
		user: process.env.MARIADB_USER,
		password: process.env.MARIADB_PASSWORD,
		connectionLimit: 2
	});
	pool.getConnection()
		.then(conn => {

			conn.query("INSERT INTO loginTable (path) VALUES (?);", [path])
				.then((res) => {
					console.log(res);
					conn.end();
				})
				.catch(err => {
					console.log(err);
					conn.end();
				})

		}).catch(err => {
			console.log(err)
		});
});

server.listen(8080);
