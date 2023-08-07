import {
  api_url,
  endPoint,
  fetch_data,
  format_price,
  removeLoader,
  chef,
} from "../components/help.js";

export async function render() {
  let template = document.createElement("section");
  template.classList.add("checkout_page");
  const order = JSON.parse(localStorage.getItem("order")) || {};
  let formattedPrice = await format_price(
    parseFloat(order["Giá trị đơn hàng"])
  );
  template.innerHTML = `
          <div class="container">
            <h2>Hướng dẫn thanh toán</h2>
            <p>Xin vui lòng chuyển khoản thanh toán vào tài khoản sau và ấn nút hoàn tất đơn hàng.
            KarT's House sẽ gọi điện xác nhận đơn hàng của bạn trong thời gian sớm nhất.</p>
            <hr>
            <h3>Chọn ngân hàng</h3>
            <label for="item1" class="item">
                <input type="radio" id="item1" name="bank" value="1" checked>
                <img src="/assets/images/bank/VIB.webp"
                <p>Ngân hàng VIB (Ngân hàng Quốc Tế)</p>
            </label>
            <label for="item2" class="item">
                <input type="radio" id="item2" name="bank" value="2">
                <img src="/assets/images/bank/MB.webp"
                <p>Ngân hàng MB bank (Ngân hàng Quân Đội)</p>
            </label>
            <hr>
            <h3>Thông tin chuyển khoản</h3>
            <div class="bank_infor">
                <div class="bank_item">
                    <p>Ngân hàng</p>
                    <p>Số tài khoản</p>
                    <p>Chủ tài khoản</p>
                    <p>Số tiền</p>
                    <p>Nội dung</p>
                </div>
                <div class="bank_item">
                    <p class="bank_name">Ngân hàng VIB (Ngân hàng Quốc Tế)</p>
                    <p class="bank_number">3336262999</p>
                    <p class="bank_account">Nguyễn Văn Thanh</p>
                    <p>${formattedPrice}</p>
                    <p>${order["Họ tên"]} ${order["Số điện thoại"]}</p>
                </div>
            </div>
            <hr>
            <p>Mọi thắc mắc cần hỗ trợ vui lòng liên hệ hotline: 024 0994 8888(9am-9pm)</p>
          </div>
          <div class="container">
            <h2>Đơn hàng của bạn</h2>
            <div class="order">
                <div class="order_item">
                    <p>Khách hàng</p>
                    <p>Số điện thoại</p>
                    <p>Địa chỉ giao hàng</p>
                    <p>Thời gian</p>
                </div>
                <div class="order_item">
                    <p>${order["Họ tên"]}</p>
                    <p>${order["Số điện thoại"]}</p>
                    <p>${order["Địa chỉ nhà"]},Quận ${order["Quận"]}</p>
                    <p class="time_order">${order["Ngày yêu cầu"]}</p>
                </div>
            </div>
            <div class="order_products"></div>
            <div class="price_item">
                <h4>Thành tiền:</h4>
                <span class="allbill" style="font-weight:bold">${formattedPrice}</span>
            </div>
          </div>
        `;

  document.querySelector(".nav-bar a.active").classList.remove("active");
  let cart_button = document.querySelectorAll(".login button");
  cart_button.forEach((item) => {
    item.classList.add("active");
  });
  for (let [k, v] of Object.entries(order["Đơn hàng"])) {
    let product = document.createElement("div");
    product.classList.add("product_item");
    product.innerHTML = `
        <h4>${v.name}</h4> <span>${v.quantity}</span>
    `;
    template.querySelector(".order_products").appendChild(product);
  }
  return template;
}

export async function callback() {
  await removeLoader();
  AOS.init();

  let bank = document.querySelectorAll("input[type='radio']");
  bank.forEach((bank) => {
    bank.addEventListener("click", function () {
      if (bank.checked == true) {
        if (bank.value == 1) {
          document.querySelector(".bank_name").textContent =
            "Ngân hàng VIB (Ngân hàng Quốc Tế)";
          document.querySelector(".bank_number").textContent = "3336262999";
          document.querySelector(".bank_account").textContent =
            "Nguyễn Văn Thanh";
        }
        if (bank.value == 2) {
          document.querySelector(".bank_name").textContent =
            "Ngân hàng MB bank (Ngân hàng Quân Đội)";
          document.querySelector(".bank_number").textContent = "66686869999";
          document.querySelector(".bank_account").textContent =
            "Nguyễn Gia Hưng";
        }
      }
    });
  });

  const order = JSON.parse(localStorage.getItem("order")) || {};
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const defaultDate = `${year}-${month}-${day}`;
  const dateArray = defaultDate.split("-");
  let formattedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

  if (order["Ngày yêu cầu"] == "") {
    document.querySelector(".time_order").textContent = formattedDate;
  }
}
