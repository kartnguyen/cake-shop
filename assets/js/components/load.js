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
	}
}