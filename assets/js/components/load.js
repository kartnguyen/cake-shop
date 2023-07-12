export const loading = {
	cake_gif() {
		let div = document.createElement('div');
		div.classList.add('loader');
		div.innerHTML = `
		<div class="cake-gif">
            <div class="icon"></div>
        </div>
		`;
		return div;
	},
	list() {
		let div = document.createElement('div');
		div.classList.add('loader');
		div.innerHTML = `
		<div class="item">
			<span class="ava loading"></span>
			<div>
				<div class="loading content long mb-6"></div>
				<div class="loading content short mb-6"></div>
				<div class="loading content short"></div>
			</div>
		</div>
		<div class="item">
			<span class="ava loading"></span>
			<div>
				<div class="loading content long mb-6"></div>
				<div class="loading content short mb-6"></div>
				<div class="loading content short"></div>
			</div>
		</div>
		`;
		
		return div;
	}
}