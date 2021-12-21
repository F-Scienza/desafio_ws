const socket = io.connect();

fetch('/api/productos/')
	.then(response => response.json())
	.then(data => console.log(data));

socket.on('products', data => {
	render(data);
});

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
