const PORT = 8738;

// IP parsing modes
const MODE = {
	default: 0,
	v4: 1,
	v6: 2
};

// NPM Module imports
var express = require('express');

// Express app setup
var app = express();

// Routes
app.get('/(:mode)?', (req, res) => {
	let mode = req.params.mode;
	let json = mode && mode.includes('json');

	if (!mode) respond(res, parseIp(req.ip));
	else respond(res, parseIp(req.ip, mode, json));
	//else respond(res, req.ip);
});

//app.use((req, res, _next) => respond(res, parseIp(req.ip)));

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
function parseIp(ip, mode = '0', json) {
	if (LOCALS.includes(ip)) ip = 'localhost';
	else if (mode.startsWith('4')) ip = ip.split(':').pop();
	else if (mode.startsWith('6')) ip = ip.split(':').slice(0, -1).join(':');
	else ip = ip;

	if (json) return { ip: ip };
	else return ip;
}