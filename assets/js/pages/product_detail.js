import { loading } from "../components/load.js";
import {
  api_url,
  endPoint,
  fetch_data,
  format_price,
} from "../components/help.js";

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
          <div class="quantity">
              <div class="buttons_added">
                  <button class="minus is-form"><i class="fa-solid fa-minus fa-lg"></i></button>
                  <span class="input-qty">${quantity}</span>
                  <button class="plus is-form"><i class="fa-solid fa-plus fa-lg"></i></button>
              </div>
              <button class="btn-add">thêm vào giỏ hàng</button>
          </div>
          <h4 class="sub_title">${sub_title}</h4>
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
