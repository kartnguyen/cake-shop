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
        <header></header>

        <main></main>

        <footer></footer>

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