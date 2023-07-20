module.exports = {
  html() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KarT's House - The Best Bakery Shop</title>
        <!-- favicon -->
        <link rel="shortcut icon" href="/assets/images/icon.png" type="image/x-icon">
        <!-- fontawesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- google font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap" rel="stylesheet">
        <!-- aos -->
        <link rel="stylesheet" href="/assets/libs/aos-master/aos.css">
        <!-- animate -->
        <link rel="stylesheet" href="/assets/libs/animate/animate.css">
        <!-- slick -->
        <link rel="stylesheet" href="/assets/libs/owlcarousel/assets/owl.carousel.min.css">
        <link rel="stylesheet" href="/assets/libs/owlcarousel/assets/owl.theme.default.min.css">
        <!-- main css -->
        <link rel="stylesheet" href="/assets/css/style.css">
    </head>
    
    <body>
        <div class="loader">
            <div class="cake-gif">
                <div class="icon"></div>
            </div>
        </div>
        <header>
            <div class="container">
                <div class="row">
                    <a href="/" title="KarT's House">
                        <img src="/assets/images/logo.svg" alt="">
                    </a>
                    <div class="navbar-toggle">
                        <div class="login">
                            <a href="/cart">
                                <button title="Giỏ hàng">
                                    <i class="fa-solid fa-cart-shopping bounceIn"></i>
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
                                </button>
                            </a>
                        </div>
                        <div class="nav-img" style="background-image: url(/assets/images/nav-bar.webp);"></div>
                    </nav>
                </div>
            </div>    
        </header>

        <main></main>

        <footer>
            <div class="container footer">
                <div class="row">
                    <div class="img">
                        <img src="/assets/images/logo.svg" alt="">
                    </div>
                    <div class="col">
                        <div class="name">
                            <h3>Thời gian làm việc</h3>
                        </div>
                        <div class="content">
                            <p>Thứ 2 - Thứ 6: 8 am - 8 pm</p>
                            <p>Thứ 7: 9am - 4pm</p>
                            <p>Chủ nhật: Đóng cửa</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="name">
                            <h3>Địa chỉ</h3>
                        </div>
                        <div class="content">
                            <p>Kart's House</p>
                            <p>Số 94 Yên Nghĩa, Hà Đông, Hà Nội</p>
                            <p>thanhnguyen.gt09@gmail.com</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="name">
                            <h3>Mạng xã hội</h3>
                        </div>
                        <div class="content">
                            <div>
                                <a href="https://www.facebook.com/">
                                    <i class="fa-brands fa-facebook fa-2x" style="color: #453cedc6;"></i>
                                    Facebook
                                </a>
                                <a href="https://www.instagram.com/">
                                    <i class=" fa-2x fa-brands fa-instagram" style="color: #ff6d2e;"></i>
                                    Instagram
                                </a>
                            </div>
                            <div class="social">
                                <a href="https://www.youtube.com/">
                                    <i class="fa-2x fa-brands fa-youtube" style="color: #d70f0f;"></i>
                                    Youtube
                                </a>
                                <a href="https://twitter.com/" style="margin-left: 18px;" class="twitter">
                                    <i class="fa-2x fa-brands fa-twitter" style="color: #57e3ff;"></i>
                                    Twitter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="container">
                <div class="copyright">
                    <span>Copyright © 2023-Powered by Thanh Nguyen</span>
                </div>
            </div>
        </footer>

        <a class="back-to-top" href="#" title="Lên đầu trang">
            <i class="fa-solid fa-chevron-up" style="color: #fff;"></i>
        </a>
        <script src="/assets/libs/jquery-3.7.0.min.js"></script>
        <script src="/assets/libs/aos-master/aos.js"></script>
        <script src="/assets/libs/owlcarousel/owl.carousel.min.js"></script>

        <script type="module" src="/assets/js/main.js"></script>
    </body>
    
    </html>
    `;

  }
}