//  conectamos al cliente con el servidor de websocket
//  y escuchamos messages
const socket = io.connect()

//  creamos una funcion que se encargue de
//  inyectar los mensajes al html
function render(data){
	const html = data.map((elem, index) => {
			return( 
            `<div>
                <strong>  ${elem.author}:  </strong>
                <em>  ${elem.text}  </em>
            </div>`
            )
		}).join(' '); //  conecta los elementos de array con un espacio
	//  lo insertamos en el dom
	document.getElementById('messages').innerHTML = html;
}

//  esta va a ser la funcion para enviar mensajes
function addMessage(e) {
	const mensaje = {
        // toma los valores del form
		author: document.getElementById('username').value,
		text: document.getElementById('texto').value,
	};
    // los envia para que escuche el servidor
	socket.emit('new-message', mensaje);
	return false; // ? 
}


//  Data tiene el array de mensajes que envia el servidor
socket.on('messages', data=>{
    render(data)
})