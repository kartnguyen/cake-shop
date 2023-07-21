import {
  api_url,
  endPoint,
  fetch_data,
  format_price,
  main
} from "../components/help.js";
import { loading } from "../components/load.js";

export async function render() {
  let template = document.createElement("section");
  template.classList.add("cart_page");
  const cart = JSON.parse(localStorage.getItem("cake")) || {};
  if (Object.keys(cart).length === 0) {
    template.innerHTML = `
      <div class="container none_obj">
        <div>
          <h2>bạn chưa có sản phẩm nào trong giỏ</h2>
          <a href="/products">
            <button> Tất cả các sản phẩm </button>
          </a>
        </div>
      </div>
        `;
  } else {
    template.innerHTML = `
      <div class="container cart_obj">
        <div class="information">
          <div class="delivery"></div>
          <div class="schedule">
            <div class="checkbox-wrapper-25">
              <input type="checkbox">
            </div>

          </div>
          <div class="method"></div>
        </div>
        <div class="order">
          <h2>Giỏ hàng</h2>
          <div class="order_item">
            <div class="cake"></div>
            <div>
              <div class="item">
                <p>Phí ship : </p> <span class="ship"></span>
              </div>
              <div class="item">
                <p>Tổng giá <span class="qty"></span> sản phẩm : </p> <span class="ttbill"></span>
              </div>
            </div>
          </div>
          <button class="confirm">Thanh toán</button>
        </div>
      </div>
      `;

    for await (let item of Object.values(cart)) {
      let { image, name, total_price, price, quantity } = item;
      let formattedPrice = await format_price(price);
      let bill = document.createElement("div");
      bill.classList.add("cake_item");
      bill.innerHTML = `
            <div class="img" style="background-image: url(${image});"></div>
            <div>
              <h4>${name}</h4>
              <p>${formattedPrice}</p>
            </div>
            <div class="buttons_added">
              <button class="minus is-form"><i class="fa-solid fa-minus fa-sm"></i></button>
              <span class="input-qty">${quantity}</span>
              <button class="plus is-form"><i class="fa-solid fa-plus fs-sm"></i></button>
              <button class="delete is-form"><i class="fa-regular fa-trash-can"></i></button>
            </div>
      `;
      template.querySelector(".cake").appendChild(bill);
    }

    let minus = template.querySelectorAll(".cart_page .minus");
    let plus = template.querySelectorAll(".cart_page .plus");
    let qty = template.querySelectorAll(".cart_page .input-qty");

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

    minus.forEach(function (item) {
      item.addEventListener("click", function () {
        handleQuantity("minus");
      });
    });

    plus.forEach(function (item) {
      item.addEventListener("click", function () {
        handleQuantity("plus");
      });
    });
  }

  document.querySelector(".nav-bar a.active").classList.remove("active");
  let cart_button = document.querySelectorAll(".login button");
  cart_button.forEach((item) => {
    item.classList.add("active");
  });
  await main();
  return template;
}
