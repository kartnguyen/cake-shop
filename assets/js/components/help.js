export const api_url = "https://64a662ab096b3f0fcc7fa7e0.mockapi.io/";
export const endPoint = {
	diving: 'cake'
}

export async function fetchData(params) {
	if (!params) {
		alert('Không tồn tại request');
		return false;
	}
	let {apiUrl, endPoint, method, callback} = params;
	
	try {
		let res = await fetch(apiUrl + endPoint, {
			method: method
		});

		let data = await res.json();
		await callback(data);
	}
	catch(error) {
		console.log(error)
	}
}

export async function removeLoader() {
	document.querySelectorAll('.loader').forEach(loader => {
		loader.remove()
	});
}