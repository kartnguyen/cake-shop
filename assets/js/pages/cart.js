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
            <div class="delivery">
              <h3>Thông tin vận chuyển</h3>
              <div class="list">
                <div class="item">
                  <label for="name">
                    <p>Họ và tên</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="name" class="input name">
                </div>
                <div class="item">
                  <label for="phone">
                    <p>Số điện thoại</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="phone" class="input phone">
                </div>
                <div class="item">
                  <label for="email">
                    <p>Email</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="email" class="input email">
                </div>
                <div class="item">
                  <label for="district">
                    <p>Quận</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="district" class="input district">
                </div>
                <div class="item">
                  <label for="address">
                    <p>Địa chỉ</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="address" class="input address">
                </div>
              </div>
            </div>
            <div class="schedule">
             <h3>Đặt lịch giao sau</h3>
             <span>
              <div class="checkbox-wrapper">
                <input class="tgl tgl-skewed" id="cb" type="checkbox"/>
                <label class="tgl-btn" data-tg-off="OFF" data-tg-on="ON" for="cb"></label>
              </div>
           </span>
             <div class="list">
              <div class="item">
                <label for="dates">
                  <p>Ngày giao hàng</p>
                </label>
                <input type="text" id="dates" class="input dates">
              </div>
              <div class="item">
                <label for="note">
                  <p>Ghi chú</p>
                </label>
                <input type="text" id="note" class="input note">
              </div>
             </div>
            </div>
            <div class="method">
              <h3>Phương thức thanh toán</h3>
              <div class="list">
                <div class="method_item">
                  <input type="radio" id="item1" name="method" value="online_payment">
                  <label for="item1" class="check-box"></label>
                  <p>Thanh toán trực tuyến</p>
                </div>
                <div class="method_item">
                    <input type="radio" id="item2" name="method" value="on_delivery">
                    <label for="item2" class="check-box"></label>
                    <p>Thanh toán khi nhận hàng</p>
                </div>
              </div>
            </div>
          </div>
          <div class="order">
            <h3>Giỏ hàng</h3>
            <div class="order_item">
              <div class="cake"></div>
              <div>
                <div class="item">
                  <h4>Phí ship : </h4> <span class="ship" style="font-weight:bold"></span>
                </div>
                <div class="item">
                  <h4>Tổng giá <span class="qty"></span> sản phẩm : </h4> <span class="ttbill" style="font-weight:bold"></span>
                </div>
              </div>
            </div>
            <div class="check_out">
              <button class="confirm">
                Thanh toán
                <div class="triangle-top-right"></div>
              </button>
            </div>
          </div>
        </div>
        `;

  async function renderCart() {
    template.querySelector(".cake").innerHTML = "";
    for (let [k, v] of Object.entries(cart)) {
      let { image, name, total_price, price, quantity } = v;
      let formattedPrice = await format_price(price);
      let bill = document.createElement("div");
      bill.classList.add("cake_item");
      bill.innerHTML = `
              <div class="img" style="background-image: url(${image});"></div>
              <div>
                <h4 class="cake_name">${name}</h4>
                <p>${formattedPrice}</p>
              </div>
              <div class="buttons_added">
                <button class="minus is-form"><i class="fa-solid fa-minus fa-sm"></i></button>
                <span class="input-qty">${quantity}</span>
                <button class="plus is-form"><i class="fa-solid fa-plus fs-sm"></i></button>
                <button class="delete is-form"><i class="fa-regular fa-trash-can"></i></button>
              </div>
        `;

      function calculateTotalPrice(params) {
        let totalPrice = 0;
        for (let key in params) {
          if (params.hasOwnProperty(key)) {
            totalPrice += params[key].total_price;
          }
        }
        return totalPrice;
      }
      let allTotalPrice = calculateTotalPrice(cart);

      let shippingFee;
      if (allTotalPrice <= 1000000) {
        shippingFee = 75000;
      } else {
        shippingFee = 135000;
      }

      allTotalPrice += shippingFee;
      let ttfee = await format_price(shippingFee);
      let ttprice = await format_price(allTotalPrice);

      template.querySelector(".cake").appendChild(bill);
      template.querySelector(".ship").innerHTML = `${ttfee}`;
      template.querySelector(".ttbill").innerHTML = `${ttprice}`;

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
  }
  renderCart(cart);
  renderIcon(cart);

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
    localStorage.setItem("cake", JSON.stringify(cart));
    renderCart();
  }

  function deleteCartItem(k) {
    delete cart[k];
    localStorage.setItem("cake", JSON.stringify(cart));
    renderCart();
    renderIcon(cart);
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

  function renderIcon(params) {
    let value = Object.keys(params).length;
    let cart_value = document.querySelectorAll(".login .cart_value");
    if (value === 0) {
      cart_value.forEach(function (item) {
        if (item.classList.contains("show")) {
          item.classList.remove("show");
          item.textContent = "";
        }
      });
    } else {
      template.querySelector('.order_item .qty').textContent = value;
      cart_value.forEach(function (item) {
        item.classList.add("show");
        item.textContent = value;
        document.querySelector(".navbar-dropdown").style.padding = "9px 16px";
      });
    }
  }

  const checkbox = template.querySelector("#cb");
  let data = "ON";

  template
    .querySelector(".checkbox-wrapper .tgl-btn")
    .addEventListener("click", function (event) {
      if (data === "ON") {
        data = "OFF";
        checkbox.checked = false;
        template
          .querySelector(".schedule .list")
          .classList.add("show", "animated", "fadeInLeftBig");
        template.querySelector(".order_item .cake").style.height = "469px";
      } else {
        data = "ON";
        checkbox.checked = true;
        template
          .querySelector(".schedule .list")
          .classList.remove("fadeInLeftBig");
        template
          .querySelector(".schedule .list")
          .classList.add("fadeOutLeftBig");
        setTimeout(() => {
          template
            .querySelector(".schedule .list")
            .classList.remove("show", "fadeOutLeftBig", "animated");
          template.querySelector(".order_item .cake").style.height = "239px";
        }, 400);
      }
    });

  return template;
}

export async function callback() {
  let name = document.querySelector(".delivery .name"),
    phone = document.querySelector(".delivery .phone"),
    email = document.querySelector(".delivery .email"),
    district = document.querySelector(".delivery .district"),
    address = document.querySelector(".delivery .address"),
    dates = document.querySelector(".schedule .dates"),
    note = document.querySelector(".schedule .note"),
    method,
    cake = document.querySelectorAll(".order_item .cake_name"),
    quantity = document.querySelectorAll(".order_item .input-qty"),
    cake_name,
    cake_quantity,
    ttbill = document.querySelector(".order_item .ttbill").textContent;

  const labels = document.querySelectorAll(".check-box");

  labels.forEach((label) => {
    label.addEventListener("click", (e) => {
      const input = e.target.parentNode;
      let radio = input.querySelector("input[type='radio']");
      method =radio.value;
    });
  });

  cake.forEach(function(item) {
    cake_name = item.textContent;
  })

  quantity.forEach(function(item) {
    cake_quantity = item.textContent;
  })

  function catch_error(params) {
    let error = document.createElement('p');
    if (!params.value) {
      params.classList.add('error');
      error.innerHTML = `${params} không được để trống!`;
      params.parentNode.appendChild(error);
    } else {
      if (error.parentNode) {
        error.remove();
      }
    }
  }
  let confirm = document.querySelector(".order .confirm");
  confirm.addEventListener("click", function () {
    catch_error(name);
    console.log(name);
    console.log(phone);
    console.log(email);
    console.log(district);
    console.log(address);
    console.log(dates);
    console.log(note);
    console.log(method);
    console.log(cake_name);
    console.log(cake_quantity);
    console.log(ttbill);
  });
}
