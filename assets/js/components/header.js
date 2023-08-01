export async function render_header() {
  let template = document.createElement("div");
  template.classList.add("container");
  template.innerHTML = `
    <div class="row">
        <a href="/" title="KarT's House">
            <img src="/assets/images/logo.svg" alt="">
        </a>
        <div class="navbar-toggle">
            <div class="login">
                <a href="/cart">
                    <button title="Giỏ hàng">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="cart_value"> </span>
                    </button>
                </a>
            </div>
            <button class="navbar-dropdown">
                <i class="fa-solid fa-bars"></i>
            </button>
        </div>
        <nav>
            <div class="nav-logo">
                <img src="/assets/images/logo.svg" alt="">
            </div>
            <div class="nav-bar">
                <a href="/" class="home active">Trang chủ</a>
                <a href="/products" class="products">Sản phẩm</a>
                <a href="/about" class="about">Về chúng tôi</a>
                <a href="/contact" class="contact">Liên hệ</a>
            </div>
            <div class="login">
                <a href="/cart">
                    <button title="Giỏ hàng" class="cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="cart_value"> </span>
                    </button>
                </a>
            </div>
            <div class="nav-img" style="background-image: url(/assets/images/nav-bar.webp);"></div>
        </nav>
    </div>
  `;
  return template;
}
