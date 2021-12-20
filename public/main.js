const socket = io.connect();
socket.on('products', data => {
	render(data);
	data.map(prod => {
		console.log(prod);
	});
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
