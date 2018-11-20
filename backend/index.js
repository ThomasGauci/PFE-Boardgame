const app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/test', function (req, res) {
	res.send('TEST');
});

app.listen(8000, function() {
	console.log('Example app listening on port 8000!');
});

io.on('connection', function(socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
    })
})