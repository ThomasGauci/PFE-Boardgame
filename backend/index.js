const io = require('socket.io')();

io.on('connection', (client) => {
	client.emit('news', { hello: 'world' });
    client.on('my other event', (data) => {
        console.log(data);
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);