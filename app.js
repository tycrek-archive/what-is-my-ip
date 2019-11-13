const PORT = 8738;
const LOCALS = ['localhost', '127.0.0.1', '::1'];

// Express app setup
var app = require('express')();

app.get('/(:mode)?', (req, res) => {
	let ip = req.get('X-Real-IP');
	let mode = req.params.mode;
	let json = mode && mode.includes('json');

	res.status(200);
	res.type(json ? 'json' : 'text');
	res.send(mode ? parseIp(ip, mode, json) : parseIp(ip))
});

// Run Express app
app.listen(PORT, () => console.log(`Server hosted on port: ${PORT}`));

// Parse an IP address
function parseIp(ip, mode = '', json) {
	if (LOCALS.includes(ip)) ip = 'localhost';
	else if (mode.startsWith('4')) ip = ip.split(':').pop();
	else if (mode.startsWith('6')) ip = ip.split(':').slice(0, -1).join(':');
	return json ? { ip: ip } : ip;
}
