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
