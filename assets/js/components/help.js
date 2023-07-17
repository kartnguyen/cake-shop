export const api_url = "https://64a662ab096b3f0fcc7fa7e0.mockapi.io/";
export const endPoint = {
	cake: 'cake'
}

export async function fetch_data(params) {
	if (!params) {
		alert('không tồn tại request');
		return false;
	}
	let {api_url, end_point, method, callback} = params;
	
	try {
		let res = await fetch(api_url + end_point, {
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

export const chef = [
	{
		name: 'Tuấn Hưng',
		avatar: './assets/images/chef/chef_1.jpg',
		job: '"Nghệ sĩ điêu khắc" bánh ngọt'
	},
	{
		name: 'Mỹ Tâm',
		avatar: './assets/images/chef/chef_2.jpg',
		job: 'Nữ đầu bếp được yêu mến'
	},
	{
		name: 'Đen Vâu',
		avatar: './assets/images/chef/chef_3.jpg',
		job: 'Chuyên gia về bánh ngọt'
	}
]