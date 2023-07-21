import { loading } from "../components/load.js";
import { format_price } from "../components/help.js";

export async function render(params) {
  let template = document.createElement("section");
  template.classList.add("products_details_page");
  let { id, image, name, content, sub_title, price, quantity } = params;

  let formattedPrice = await format_price(price);
  template.innerHTML = `
  	<div class="container">
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
	`;

  for (let img of image) {
    let cake_img = document.createElement("div");
    cake_img.classList.add("item");
    cake_img.innerHTML = `
      <div class="cake-img" style="background-image: url(${img})"></div>
  `;

    template.querySelector(".images").appendChild(cake_img);
  }

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
    let qty = parseInt(document.querySelector(".products_details_page .input-qty").innerHTML);
    let new_item = {
      id: id,
      name: name,
      image: image[0],
      price: price,
      total_price: price*qty,
      quantity: qty,
    };
    const cart = JSON.parse(localStorage.getItem("cake")) || {};
    let key = new_item.name;
    if (cart[key]) {
      cart[key]["quantity"] += qty;
      cart[key]["total_price"] = cart[key]["quantity"] * cart[key]["price"];
    } else {
      cart[key] = new_item;
    }
    localStorage.setItem("cake", JSON.stringify(cart));
  });
}
