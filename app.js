const PORT = 8738;

// Express app setup
var app = require('express')();

app.get('/(:mode)?', (req, res) => {
	let ip = req.ip;
	let mode = req.params.mode;
	let json = mode && mode.includes('json');

	respond(res, mode ? parseIp(ip, mode, json) : parseIp(ip));
});

// Run Express app
app.listen(PORT, () => console.log(`Server hosted on port: ${PORT}`));

// Send an Express.js response
function respond(res, payload) {
	res.status(200);
	res.type('text');
	res.send(payload);
}

const LOCALS = ['localhost', '127.0.0.1', '::1'];

// Parse an IP address
function parseIp(ip, mode = '', json) {
	if (LOCALS.includes(ip)) ip = 'localhost';
	else if (mode.startsWith('4')) ip = ip.split(':').pop();
	else if (mode.startsWith('6')) ip = ip.split(':').slice(0, -1).join(':');
	else ip = ip;

	if (json) return { ip: ip };
	else return ip;
}