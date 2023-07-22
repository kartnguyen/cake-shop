import {
  api_url,
  endPoint,
  fetch_data,
  format_price,
  main,
} from "../components/help.js";
import { loading } from "../components/load.js";

export async function render() {
  let template = document.createElement("section");
  template.classList.add("cart_page");
  const cart = JSON.parse(localStorage.getItem("cake")) || {};
  template.innerHTML = `
        <div class="container cart_obj">
          <div class="information">
            <div class="delivery"></div>
            <div class="schedule"></div>
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

  for (let [k, v] of Object.entries(cart)) {
    let { image, name, total_price, price, quantity } = v;
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
    
    bill.querySelector(".minus").addEventListener("click", function () {
      handleQuantity({
        type: "minus",
        key: k,
      });
    });

    bill.querySelector(".plus").addEventListener("click", function () {
      handleQuantity({
        type: "plus",
        key: k,
      });
    });

    bill.querySelector(".delete").addEventListener("click", function () {
      modal({
        text: "Xóa sản phẩm?",
        todo: function () {
          deleteCartItem(k);
        },
      });
    });
  }
  checkCart(cart);

  function handleQuantity(params) {
    let { type, key } = params;
    if (type == "minus") {
      cart[key]["quantity"] -= 1;
      if (cart[key]["quantity"] < 1) {
        cart[key]["quantity"] = 1;
      }
      cart[key]["total_price"] = cart[key]["price"] * cart[key]["quantity"];
    }
    if (type == "plus") {
      cart[key]["quantity"] += 1;
      cart[key]["total_price"] = cart[key]["price"] * cart[key]["quantity"];
    }
    updateBill();
  }

  function deleteCartItem(k) {
    delete cart[k];
    console.log(cart[k]);
    updateBill();
  }

  function checkCart(params) {
    if (Object.keys(params).length === 0) {
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
    }
  }

  function updateBill() {
    let ttBill = 0;

    for (let [k, v] of Object.entries(cart)) {
      ttBill += v.total_price;
    }
    template.querySelector(".ttbill").innerHTML = format_price(ttBill);
  }

  function modal(params) {
    let { text, todo } = params;
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    let dialog = document.createElement("div");
    dialog.classList.add("modal");
    dialog.innerHTML = `
      <div class="close_btn"><i class="fa-solid fa-circle-xmark"></i></div>
      <div class="modal_content">
      <div class="modal_text">${text}</div>
      <div class="modal_btn">
        <button class="m_btn" id="cancel">Hủy</button>
        <button class="m_btn btn-primary" id="ok">Đồng ý</button>
      </div>
      </div>
    `;

    function remove_dialog(params) {
      params.addEventListener("click", function () {
        dialog.remove();
        document.body.classList.remove("overflow-hidden");
        overlay.remove();
      });
    }

    document.body.classList.add("overflow-hidden");
    document.querySelector("header .row").appendChild(overlay);
    document.body.appendChild(dialog);

    remove_dialog(dialog.querySelector("#ok"));
    remove_dialog(dialog.querySelector("#cancel"));
    remove_dialog(dialog.querySelector(".close_btn"));

    let ok = document.querySelector("#ok");
    ok.addEventListener("click", function () {
      todo();
    });
  }

  document.querySelector(".nav-bar a.active").classList.remove("active");
  let cart_button = document.querySelectorAll(".login button");
  cart_button.forEach((item) => {
    item.classList.add("active");
  });

  return template;
}
