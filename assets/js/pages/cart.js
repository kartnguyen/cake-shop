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
                  <input type="text" id="name" class="input name" tag="Họ và tên">
                </div>
                <div class="item">
                  <label for="phone">
                    <p>Số điện thoại</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="phone" class="input phone" tag="Số điện thoại">
                </div>
                <div class="item">
                  <label for="email">
                    <p>Email</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="email" class="input email" tag="Email">
                </div>
                <div class="item">
                  <label for="district">
                    <p>Quận</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="district" class="input district" tag="Quận">
                </div>
                <div class="item">
                  <label for="address">
                    <p>Địa chỉ</p>
                    <span class="required" title="required">*</span>
                  </label>
                  <input type="text" id="address" class="input address" tag="Địa chỉ">
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
                <input type="date" id="dates" class="input dates">
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
              <div style="margin-top:auto">
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
      template.querySelector(".order_item .qty").textContent = value;
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

        const dateInput = document.querySelector(".schedule .dates");
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const defaultDate = `${year}-${month}-${day}`;
        dateInput.value = defaultDate;
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
      method = radio.value;
    });
  });

  cake.forEach(function (item) {
    cake_name = item.textContent;
  });

  quantity.forEach(function (item) {
    cake_quantity = item.textContent;
  });

  let errors = {};

  function catch_error(params) {
    if (!params.value) {
      if (!errors[params.id]) {
        params.classList.add("error");
        errors[params.id] = document.createElement("p");
        errors[params.id].style.marginTop = "14px";
        errors[params.id].style.color = "red";
        params.parentNode.appendChild(errors[params.id]);
        errors[params.id].innerHTML = `${params.getAttribute(
          "tag"
        )} không được để trống!`;
      }
    } else {
      if (params.id === "phone") {
        let regex = /^[0-9]{10}$/;
        if (!regex.test(params.value)) {
          params.classList.add("error");
          if (!errors[params.id]) {
            errors[params.id] = document.createElement("p");
            errors[params.id].style.marginTop = "14px";
            errors[params.id].style.color = "red";
            params.parentNode.appendChild(errors[params.id]);
          }
          errors[params.id].innerHTML = `${params.getAttribute(
            "tag"
          )} không hợp lệ!`;
        } else {
          params.classList.remove("error");
          if (errors[params.id]) {
            errors[params.id].remove();
            delete errors[params.id];
          }
        }
      } else if (params.id === "email") {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(params.value)) {
          params.classList.add("error");
          if (!errors[params.id]) {
            errors[params.id] = document.createElement("p");
            errors[params.id].style.marginTop = "14px";
            errors[params.id].style.color = "red";
            params.parentNode.appendChild(errors[params.id]);
          }
          errors[params.id].innerHTML = `${params.getAttribute(
            "tag"
          )} không hợp lệ!`;
        } else {
          params.classList.remove("error");
          if (errors[params.id]) {
            errors[params.id].remove();
            delete errors[params.id];
          }
        }
      } else {
        params.classList.remove("error");
        if (errors[params.id]) {
          errors[params.id].remove();
          delete errors[params.id];
        }
      }
      return true;
    }
    return false;
  }

  let confirm = document.querySelector(".order .confirm");
  confirm.addEventListener("click", function () {
    // const orderItem = document.querySelector(".order");
    // const orderItemHeight = parseFloat(
    //   window.getComputedStyle(orderItem).height
    // );

    // console.log(orderItem);
    // console.log(orderItemHeight);
    // if (orderItemHeight > 410) {
    //   document.querySelector(".order .cake").style.height = "fit-content";
    // } else {
    //   document.querySelector(".order .cake").style.height = "239px";
    // }
    catch_error(name);
    catch_error(phone);
    catch_error(email);
    catch_error(district);
    catch_error(address);
    if (!method) {
      let method_error = document.createElement("p");
      method_error.classList.add("method_error");
      method_error.style.color = "red";
      method_error.innerHTML = `Bạn chưa chọn phương thức thanh toán`;
      document.querySelector(".method .list").appendChild(method_error);
    } else {
      if (document.querySelector(".method .list .method_error")) {
        document.querySelector(".method .list .method_error").remove();
      }
    }
    let checkbox = document.querySelector("#cb");
    let formattedDate;
    if (checkbox.checked) {
      const selectedDate = dates.value;
      const dateArray = selectedDate.split("-");
      formattedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    }
    function set_orrder() {
      let order = {
        "Họ tên": name.value,
        "Số điện thoại": phone.value,
        'Email': email.value,
        'Quận': district.value,
        "Địa chỉ nhà": address.value,
        "Phương án giao hàng": method,
        "Ngày yêu cầu": formattedDate,
        "Ghi chú": note.value,
        "Loại bánh": cake_name,
        "Số lượng": cake_quantity,
        "Tổng tiền": ttbill,
      };
      localStorage.setItem("order", JSON.stringify(order));
    }
    // set_orrder();
    if (
      catch_error(name) &
      catch_error(phone) &
      catch_error(email) &
      catch_error(district) &
      catch_error(address) &
      method
    ) {
      console.log(a);
      set_orrder();
    }
  });
}
