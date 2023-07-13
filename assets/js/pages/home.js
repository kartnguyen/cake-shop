export async function render() {
  let template = document.createElement("div");
  template.classList.add('home_page')
  template.innerHTML = `
        <section>
        <div class="container title" style="min-height: 550px;" data-aos="fade-down" data-aos-easing="linear"
            data-aos-duration="500">
            <div class="content">
                <div class="text">
                    <h2 style="font-size: 54px;">Niềm hạnh phúc khi cùng nhau thưởng thức bánh</h2>
                    <p>Sự ra đời của KarT's House bắt nguồn từ niềm đam mê bất tận về bánh ngọt của một người đầu
                        bếp và tư
                        duy sáng tạo của một nhà thiết kế. Được định hình là thương hiệu bánh ngọt chuẩn Pháp,
                        KarT's House
                        trao tới bạn những chiếc bánh Entremet tinh tế, cùng nhiều loại bánh ngọt cao cấp và trên
                        hết - niềm hạnh phúc khi thưởng thức bánh cùng những người mà bạn yêu thương.</p>
                </div>
                <div class="action">
                    <button>
                        <a href="/products" style="color: #fff">Đặt hàng</a>
                    </button>
                    <button>
                        <a href="/about" style="color: #fff">Tìm Hiểu Thêm Về KarT's House</a>
                    </button>
                </div>
            </div>
            <div class="owl-carousel owl-theme">
                <div class="item" style="background-image: url(./assets/images/cake/store-1.jpg);"></div>
                <div class="item" style="background-image: url(./assets/images/cake/store-2.jpg);"></div>
                <div class="item" style="background-image: url(./assets/images/cake/store-3.jpg);"></div>
            </div>
        </div>
        </section>
        <section>
        <div class="container title left" style="min-height: 450px;" data-aos="fade-left" data-aos-easing="linear"
            data-aos-duration="500">
            <div class="img" style="background-image: url(./assets/images/cake/cake-7.jpg);"></div>
            <div class="text">
                <h2 style="color: #A66D56;">Bánh Entremet</h2>
                <p>Là dòng bánh hiện đại và cao cấp nhất của Pháp, Entremet được tạo nên bởi nhiều tầng kết cấu đặc
                    biệt và những kỹ thuật đòi hỏi tay nghề cao của người Chef. Mỗi chiếc bánh là sự hoà quyện của
                    những lớp bạt xốp mềm, lớp kem thơm ngậy và hương vị đặc trưng của trái cây tươi.</p>
            </div>
        </div>
        </section>
        <section>
        <div class="container title" style="min-height: 420px;" data-aos="fade-right" data-aos-easing="linear"
            data-aos-duration="500">
            <div class="content">
                <div class="text">
                    <h2>Chất lượng</h2>
                    <p>Để mang lại trải nghiệm đáng nhớ trong từng chiếc bánh, sản phẩm của KarT's House được làm từ
                        những nguyên liệu được chọn lựa cẩn thận và hoàn thiện tỉ mỉ với những tiêu chuẩn cao cấp
                        nhất.</p>
                </div>
            </div>
            <div class="img" style="background-image: url(./assets/images/cake/cake-5.jpg);"></div>
        </div>
        </section>
        <section>
        <div class="container title left" style="min-height: 500px;" data-aos="fade-left" data-aos-easing="linear"
            data-aos-duration="500">
            <div class="img" style="background-image: url(./assets/images/cake/cake-10.jpg);"></div>
            <div class="text">
                <h2 style="color: #A66D56;">Cho mọi người</h2>
                <p>Bánh của KarT's House được nghiên cứu để phù hợp với khẩu vị của người Việt và luôn được đóng gói
                    chỉnh chu để ai cũng có thể nhận về những niềm vui khi bánh được giao tới tận nơi.</p>
            </div>
        </div>
        </section>
    `;

  let homeCss = document.createElement("link");
  homeCss.href = "./assets/css/home.css";
  homeCss.rel = "stylesheet";
  homeCss.type = "text/css";
  document.head.appendChild(homeCss);

  let jqueryScript = document.createElement("script");
  jqueryScript.src = "./assets/js/components/jquery-3.7.0.min.js";
  jqueryScript.async = true;
  jqueryScript.onload = function () {
    let owlCarouselScript = document.createElement("script");
    owlCarouselScript.src = "./assets/libs/owlcarousel/owl.carousel.min.js";
    owlCarouselScript.async = true;
    owlCarouselScript.onload = function () {
      let mainScript = document.createElement("script");
      mainScript.src = "./assets/js/main.js";
      mainScript.async = true;
      document.body.appendChild(mainScript);
    };
    document.body.appendChild(owlCarouselScript);
  };
  document.body.appendChild(jqueryScript);

  let aosScript = document.createElement("script");
  aosScript.src = "./assets/libs/aos-master/aos.js";
  aosScript.async = true;
  document.body.appendChild(aosScript);

  aosScript.onload = function () {
    AOS.init();
  };

  return template;
}