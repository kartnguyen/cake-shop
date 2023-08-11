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
          <div class="container bank-container"></div>
          <div class="container product-container">
            <h2>Đơn hàng của bạn</h2>
            <div class="order">
                <div class="order_item">
                    <p style="text-decoration: underline">Khách hàng</p>
                    <p>${order["Họ tên"]}</p>
                </div>
                <div class="order_item">
                    <p style="text-decoration: underline">Số điện thoại</p>
                    <p>${order["Số điện thoại"]}</p>
                </div>
                <div class="order_item">
                    <p style="text-decoration: underline">Địa chỉ giao hàng</p>
                    <p>${order["Địa chỉ nhà"]}, Quận ${order["Quận"]}</p>
                </div>
                <div class="order_item">
                    <p style="text-decoration: underline">Thời gian</p>
                    <p class="time_order">${order["Ngày yêu cầu"]}</p>
                </div>
                <div class="order_item">
                    <p style="text-decoration: underline">Ghi chú</p>
                    <p class="notes">${order["Ghi chú"]}</p>
                </div>
            </div>
            <div class="order_products">
              <p style="text-decoration: underline; margin-bottom:16px">Đơn hàng</p>
            </div>
            <div class="price_item">
                <p style="text-decoration: underline">Thành tiền</p>
                <span style="font-weight: 700">${formattedPrice}</span>
            </div>
            <button class="submit">
              Xác nhận thanh toán
              <div class="triangle-top-right"></div>
            </button>
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
        <p>${v.name}</p> <span> x ${v.quantity}</span>
    `;
    template.querySelector(".order_products").appendChild(product);
  }

  if (order["Phương án giao hàng"] == "online_payment") {
    template.querySelector(".bank-container").style.display = "block";
    let bank = document.createElement("div");
    bank.classList.add("bank-wapper");
    bank.innerHTML = `
    <h2>Hướng dẫn thanh toán</h2>
    <p class="bank-p">Xin vui lòng chuyển khoản thanh toán vào tài khoản sau và ấn nút xác nhận thanh toán.
    KarT's House sẽ gọi điện xác nhận đơn hàng của bạn trong thời gian sớm nhất.</p>
    <hr>
    <h3>Chọn ngân hàng</h3>
    <label for="item1" class="item vib-name">
        <input type="radio" id="item1" name="bank" value="1" checked>
        <img src="/assets/images/bank/VIB.webp" class="vib">
        <p>Ngân hàng VIB (Ngân hàng Quốc Tế)</p>
    </label>
    <label for="item2" class="item mb-name">
        <input type="radio" id="item2" name="bank" value="2">
        <img src="/assets/images/bank/MB.webp" class="mb">
        <p>Ngân hàng MB bank (Ngân hàng Quân Đội)</p>
    </label>
    <hr>
    <h3>Thông tin chuyển khoản</h3>
    <div class="bank_infor">
        <div class="bank_item">
            <p>Ngân hàng</p>
            <p class="bank_name">Ngân hàng VIB (Ngân hàng Quốc Tế)</p>
        </div>
        <div class="bank_item">
            <p>Số tài khoản</p>
            <p class="bank_number">3336262999</p>
        </div>
        <div class="bank_item">
            <p>Chủ tài khoản</p>
            <p class="bank_account">Nguyễn Văn Thanh</p>
        </div>
        <div class="bank_item">
            <p>Số tiền</p>
            <p>${formattedPrice}</p>
        </div>
        <div class="bank_item">
            <p>Nội dung</p>
            <p>${order["Họ tên"]} ${order["Số điện thoại"]}</p>
        </div>
    </div>
    <hr>
    <p class="bank-p2">Mọi thắc mắc cần hỗ trợ vui lòng liên hệ hotline: <span style="text-decoration: underline">024 0994 8888</span> (9am-9pm)</p>
    `;
    template.querySelector(".bank-container").appendChild(bank);
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
          document.querySelector(".item .mb").style.opacity = "0.5";
          document.querySelector(".item .vib").style.opacity = "1";
          document.querySelector(".mb-name").style.backgroundColor =
            "transparent";
          document.querySelector(".vib-name").style.backgroundColor =
            "rgba(211, 211, 211, 0.637)";
          document.querySelector(".bank_name").textContent =
            "Ngân hàng VIB (Ngân hàng Quốc Tế)";
          document.querySelector(".bank_number").textContent = "3336262999";
          document.querySelector(".bank_account").textContent =
            "Nguyễn Văn Thanh";
        }
        if (bank.value == 2) {
          document.querySelector(".item .vib").style.opacity = "0.5";
          document.querySelector(".item .mb").style.opacity = "1";
          document.querySelector(".mb-name").style.backgroundColor =
            "rgba(211, 211, 211, 0.637)";
          document.querySelector(".vib-name").style.backgroundColor =
            "transparent";
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
  if (order["Ghi chú"] == "") {
    document.querySelector(".notes").textContent = "Không";
  }

  document.querySelector(".submit").addEventListener("click", function () {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    let dialog = document.createElement("div");
    dialog.classList.add("modal");
    dialog.innerHTML = `
      <div class="modal_content">
      <div class="modal_text">Đơn hàng đã được tạo thành công.<br>Cảm ơn bạn đã mua hàng của <b>KarT's House</b></div>
      <div class="modal_btn">
        <button class="m_btn btn-primary" style=" margin: 16px auto">
          <a href="/" style="color:#fff">Quay lại trang chủ</a>
        </button>
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

    remove_dialog(dialog.querySelector(".m_btn"));
    remove_dialog(document.querySelector(".overlay"));
    document.querySelector(".m_btn").addEventListener("click", function () {
      localStorage.clear();
    });
  });
}
