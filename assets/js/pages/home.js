import {
  api_url,
  endPoint,
  fetch_data,
  format_price,
  removeLoader,
} from "../components/help.js";

export async function render() {
  let get_products = {
    api_url: api_url,
    end_point: endPoint.cake,
    method: "GET",
    async callback(params) {
      await render_products(params);
    },
  };

  let template = document.createElement("div");
  template.classList.add("home_page");
  template.innerHTML = `
        <section>
        <div class="container title" style="min-height: 550px;" data-aos="fade-down" data-aos-easing="linear"
            data-aos-duration="500">
            <div class="content">
                <div class="text">
                    <h2 style="font-size: 54px;">Niềm hạnh phúc khi cùng nhau thưởng thức bánh</h2>
                    <p>Sự ra đời của <b><i>KarT's House</i></b> bắt nguồn từ niềm đam mê bất tận về bánh ngọt của một người đầu
                        bếp và tư
                        duy sáng tạo của một nhà thiết kế. Được định hình là thương hiệu bánh ngọt chuẩn Pháp,
                        <b><i>KarT's House</i></b>
                        trao tới bạn những chiếc bánh Entremet tinh tế, cùng nhiều loại bánh ngọt cao cấp và trên
                        hết - niềm hạnh phúc khi thưởng thức bánh cùng những người mà bạn yêu thương.</p>
                </div>
                <div class="action">
                    <a href="/products">
                        <button class="cart">đặt hàng ngay</button>
                    </a>
                </div>
            </div>
            <div class="slide-img owl-carousel owl-theme">
                <div class="item" style="background-image: url(./assets/images/cake/store-1.jpg);"></div>
                <div class="item" style="background-image: url(./assets/images/cake/store-2.jpg);"></div>
                <div class="item" style="background-image: url(./assets/images/cake/store-3.jpg);"></div>
            </div>
        </div>
        </section>
        <section>
        <div class="container" data-aos="fade-up" data-aos-easing="linear"
        data-aos-duration="500">
            <div class="products-title">
                <h2 class="name-products">Danh mục sản phẩm</h2>
                <a href="/products">Xem thêm</a>
            </div>
            <div class="slider-products owl-carousel owl-theme"></div>
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
                    <p>Để mang lại trải nghiệm đáng nhớ trong từng chiếc bánh, sản phẩm của <b><i>KarT's House</i></b> được làm từ
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
                <p>Bánh của <b><i>KarT's House</i></b> được nghiên cứu để phù hợp với khẩu vị của người Việt và luôn được đóng gói
                    chỉnh chu để ai cũng có thể nhận về những niềm vui khi bánh được giao tới tận nơi.</p>
            </div>
        </div>
        </section>
    `;

  async function render_products(params) {
    template.querySelector(".slider-products").innerHTML = "";
    for (let cake of params) {
      let { id, image, name, price } = cake;
      let div = document.createElement("div");
      div.classList.add("item");
      let formattedPrice = await format_price(price);
      div.innerHTML = `
                <div class="img" style="background-image: url(${image[0]});"></div>
                <div class="content">
                    <h3>${name}</h3>
                    <h4>${formattedPrice}</h4>
                </div>
                <a href="/product_detail/${id}">Xem sản phẩm</a>
              `;

      template.querySelector(".slider-products").appendChild(div);
    }
  }

  await fetch_data(get_products);

  return template;
}

export async function callback() {
  await removeLoader();
  $(".slide-img").owlCarousel({
    items: 1,
    nav: false,
    dots: false,
    animateOut: "fadeOut",
    mouseDrag: false,
    loop: true,
    autoplay: true,
  });

  $(".slider-products").owlCarousel({
    loop: true,
    autoplay: true,
    margin: 15,
    nav: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    navText: ['<i class="fa-solid fa-chevron-left"></i>','<i class="fa-solid fa-chevron-right"></i>']
  });

  AOS.init();
}
