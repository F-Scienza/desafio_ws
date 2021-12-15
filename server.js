const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//  indicamos ruta de archivos estaticos
app.use(express.static('./public'))

//  para probar creamos un array de mensajes que vamos a 
//  enviar cuando se conecte un cliente web
const messages = [
    { author: "Cufa", text: "Hola we!" },
];

//  servidor escuchando puerto 3000 de localhost
httpServer.listen(3000, function () {
	console.log('Server running...' );
});

//  el servidor de websocket espera la conexion
//  y en emit enviamos el array
//  CONNECTION ES OBLIGATORIO 
io.on('connection', function(socket){
    console.log('un cliente se ha conectado')
    socket.emit('messages', messages);

    // escuchamos el evento new-message, recibimos data
    // y lo agregamos al array messages
    socket.on('new-message', data => {
			messages.push(data);
			io.sockets.emit('messages', messages);
		});

})