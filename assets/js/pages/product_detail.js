import {
  api_url,
  endPoint,
  fetch_data,
  format_price,
  removeLoader,
} from "../components/help.js";

export async function render(params) {
  let template = document.createElement("section");
  template.classList.add("products_details_page");
  let { id, image, name, content, sub_title, price, quantity, category } =
    params;
  let main_cate = category;
  let main_id = id;
  let formattedPrice = await format_price(price);
  template.innerHTML = `
  	<div class="container">
      <div class="products-container">
        <div class="slider">
          <div class="slide cake-img" style="background-image: url(${image[0]})"></div>
          <div class="images"></div>
        </div>
        <div class="content">
            <h3 class="name">${name}</h3>
            <h4 class="sub_title">${sub_title}</h4>
            <div class="quantity">
                <div class="buttons_added">
                    <button class="minus is-form"><i class="fa-solid fa-minus fa-lg"></i></button>
                    <span class="input-qty">${quantity}</span>
                    <button class="plus is-form"><i class="fa-solid fa-plus fa-lg"></i></button>
                </div>
                <button class="btn-add">thêm vào giỏ hàng</button>
            </div>
            <h4 class="price">${formattedPrice}</h4>
            <p>${content}</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="related-pro">
        <h2 class="name-products">Các sản phẩm liên quan</h2>
        <div class="related owl-carousel owl-theme"></div>
      </div>
    </div>
	`;

  for (let img of image) {
    let cake_img = document.createElement("div");
    cake_img.classList.add("item");
    cake_img.innerHTML = `
      <div class="cake-img" style="background-image: url(${img})"></div>
  `;

    template.querySelector(".images").appendChild(cake_img);
  }

  let get_products = {
    api_url: api_url,
    end_point: endPoint.cake,
    method: "GET",
    async callback(params) {
      await render_products(params);
      await render_related();
    },
  };
  async function render_products(params) {
    for (let cake of params) {
      let { id, image, name, price, category } = cake;
      if (main_cate.includes(category[0]) & id!=main_id) {
        let related_product = document.createElement("div");
        related_product.classList.add("item");
        let formattedPrice = await format_price(price);
        related_product.innerHTML = `
          <div class="img" style="background-image: url(${image[0]});"></div>
          <div class="content">
              <h3>${name}</h3>
              <h4>${formattedPrice}</h4>
          </div>
          <a href="/product_detail/${id}">Xem sản phẩm</a>
        `;
        template.querySelector('.related').appendChild(related_product);
      }
    }
  }

  fetch_data(get_products)

  document.querySelector(".nav-bar a.active").classList.remove("active");
  document.querySelector(".nav-bar .products").classList.add("active");

  let minus = template.querySelector(".products_details_page .minus");
  let plus = template.querySelector(".products_details_page .plus");
  let qty = template.querySelector(".products_details_page .input-qty");

  async function handleQuantity(type) {
    let currentQuantity = parseInt(qty.innerHTML);
    minus.style.pointerEvents = "all";
    if (type == "minus") {
      currentQuantity -= 1;
      if (currentQuantity < 1) {
        minus.style.pointerEvents = "none";
        currentQuantity = 1;
      }
    }
    if (type == "plus") {
      currentQuantity += 1;
    }
    qty.innerHTML = currentQuantity;
  }

  minus.addEventListener("click", function () {
    handleQuantity("minus");
  });

  plus.addEventListener("click", function () {
    handleQuantity("plus");
  });

  return template;
}

export async function render_cake_img() {
  let cake_img = document.querySelectorAll(".images .cake-img");
  document.querySelector(".images .cake-img").classList.add("active");
  cake_img.forEach(function (item) {
    item.addEventListener("click", (e) => {
      document.querySelector(".cake-img.active").classList.remove("active");
      e.currentTarget.classList.add("active");
      let img_src = e.currentTarget.style.backgroundImage;
      document.querySelector(".slide").style.backgroundImage = `${img_src}`;
    });
  });
}

export async function callback(params) {
  document.querySelector(".btn-add").addEventListener("click", function (e) {
    let { id, image, name, price } = params;
    let qty = parseInt(
      document.querySelector(".products_details_page .input-qty").innerHTML
    );
    let new_item = {
      id: id,
      name: name,
      image: image[0],
      price: price,
      total_price: price * qty,
      quantity: qty,
    };
    const cart = JSON.parse(localStorage.getItem("cake")) || {};
    let key = new_item.id;
    if (cart[key]) {
      cart[key]["quantity"] += qty;
      cart[key]["total_price"] = cart[key]["quantity"] * cart[key]["price"];
    } else {
      cart[key] = new_item;
    }
    localStorage.setItem("cake", JSON.stringify(cart));
    renderIcon(cart);

    function renderIcon(params) {
      let value = Object.keys(params).length;
      let totalQuantity = 0;
      let notice = document.createElement("div");

      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          totalQuantity += params[k].quantity;
        }
      }
      let cake_value = totalQuantity;
      let cake_input = document.querySelector(".input-qty").textContent;
      let cart_value = document.querySelectorAll(".login .cart_value");
      if (value === 0) {
        cart_value.forEach(function (item) {
          if (item.classList.contains("show")) {
            item.classList.remove("show");
            item.textContent = "";
          }
        });
      } else {
        notice.classList.add("notice", "animated", "fadeInRightBig");
        notice.innerHTML = `Đã thêm ${cake_input} bánh vào giỏ hàng`;

        cart_value.forEach(function (item) {
          item.classList.add("show");
          item.textContent = cake_value;
          document.querySelector(".navbar-dropdown").style.padding = "9px 16px";
          document.querySelector('header').appendChild(notice);
        });
      }
      setTimeout(() => {
        notice.remove();
      }, 1700);
    }
  });
}
export async function remove() {
  await removeLoader();
}

async function render_related() {
  $(".related").owlCarousel({
    loop: true,
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
}
