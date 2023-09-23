import {
  api_url,
  endPoint,
  fetch_data,
  format_price,
  removeLoader,
} from "../components/help.js";

export async function render() {
  let template = document.createElement("section");
  template.classList.add("contact_page");
  template.innerHTML = `
  <div class="container">
    <h1 class="title">kết nối với KarT's House</h1>
    <div class="contact_form">
        <div class="form">
            <div class="list">
                <div class="item">
                    <label for="name">
                        <p>Họ và tên</p>
                        <span class="required" title="required">*</span>
                    </label>
                    <input type="text" id="name" class="input name" required>
                </div>
                <div class="item">
                    <label for="email">
                        <p>Email</p>
                        <span class="required" title="required">*</span>
                    </label>
                    <input type="email" id="email" class="input email" required>
                </div>
                <div class="item">
                    <label for="mess">
                        <p>Lời nhắn cho chúng tôi</p>
                    </label>
                    <textarea name="mess" id="mess" rows="6" cols="50"></textarea>
                </div>
                <button class="submit"> Gửi </button>
            </div>
            <div class="infor">
                <div class="col">
                    <div class="name">
                        <h3>Địa chỉ</h3>
                    </div>
                    <div class="content">
                        <p>Kart's House</p>
                        <p>Số 94 Yên Nghĩa, Hà Đông, Hà Nội</p>
                    </div>
                </div>
                <div class="col">
                    <div class="name">
                        <h3>Điện thoại liên hệ</h3>
                    </div>
                    <div class="content">
                        <p>024 0994 8888</p>
                        <p>098 888 8888</p>
                    </div>
                </div>
                <div class="col">
                    <div class="name">
                        <h3>Email</h3>
                    </div>
                    <div class="content">
                        <p>karthouse@gmail.com</p>
                        <p>thanhnguyen.gt09@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="map">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.9180378214455!2d105.75369607588645!3d20.95580639027916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452e853622635%3A0xcce111148ff14001!2zOTQgWcOqbiBOZ2jEqWEsIFBow7ogTMOibSwgSMOgIMSQw7RuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1690648328589!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    </div>
        `;
  document.querySelector(".nav-bar a.active").classList.remove("active");
  document.querySelector(".nav-bar .contact").classList.add("active");

  template.querySelector(".submit").addEventListener("click", function () {
    var name = template.querySelector(".name").value;
    var email = template.querySelector(".email").value;

    if (name.trim() === "" || email.trim() === "") {
      let error = document.createElement("p");
      if (!document.querySelector(".list>p")) {
        error.style.marginTop = "14px";
        error.style.color = "red";
        error.innerHTML = `Vui lòng điền đầy đủ thông tin!`;
      }

      template.querySelector(".list").appendChild(error);
      if (name.trim() === "") {
        template.querySelector(".name").style.border = `1px solid red`;
      }
      if (email.trim() === "") {
        template.querySelector(".email").style.border = `1px solid red`;
      }
    } else {
      if (document.querySelector(".list>p")) {
        document.querySelector(".list>p").remove();
      }
      template.querySelector(".name").style.border = `1px solid #cdcccc`;
      template.querySelector(".email").style.border = `1px solid #cdcccc`;

      let overlay = document.createElement("div");
      overlay.classList.add("overlay");
      let dialog = document.createElement("div");
      dialog.classList.add("modal");
      dialog.innerHTML = `
        <div class="modal_content">
        <div class="modal_text" style="margin-top: 16px">Biểu mẫu đã được gửi thành công!</div>
        <div class="modal_btn">
          <button class="m_btn btn-primary" id="ok" style="margin: 4px auto;">Đồng ý</button>
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
      remove_dialog(document.querySelector(".overlay"));
      dialog.querySelector("#ok").addEventListener("click", function () {
        template.querySelector(".name").value = "";
        template.querySelector(".email").value = "";
      });
    }
  });

  return template;
}

export async function callback() {
  await removeLoader();
}
