const socket = io.connect();

fetch('/api/productos/')
	.then(response => response.json())
	.then(data => console.log(data));

socket.on('products', data => {
	render(data);
});

let productTitle 
let productPrice
let productThumbnail

function createProduct(){
	const productDetails = {
		title: productTitle,
		price: productPrice,
		thumbnail: productThumbnail,
	}
	socket.emit('addproduct', productDetails)	
}

function submitForm(e){
	e.preventDefault()
    productTitle = document.getElementById('title').value;
	productPrice = document.getElementById('price').value;
	productThumbnail = document.getElementById('thumbnail');
	createProduct();
}

function render(data) {
	const html = data.map(prod=> {	
		return (`
			<tr>
				<td>${prod.title}</td>
				<td>$${prod.price}</td>
				<td><img src=${prod.thumbnail} width=70px/> </td>
			</tr>
		`)
	});
	document.getElementById('live-products').innerHTML = html;
}


// Escuchando el evento 'diego'
socket.on('message', data => {
    data= `<br/> <span style="color:blue;font-weight:bold"> 
	${data.user} </span> - <span style="color:darkolivegreen;font-weight:bold"> 
	${data.date} </span> - <span style="color:black;font-weight:bold"> 
	${data.message}</span>`;
    $("#chat").append(data)
})
    $('#btn').click(sendMessage);

// Emite mensaje al servidor

function sendMessage() {
    user= $("#user").val();
    let msn = {
        date: new Date().toLocaleTimeString(),
        message: $("#msn")[0].value,
        user: user
    }
    socket.emit("message", msn);
    $("#msn")[0].value = "";
}