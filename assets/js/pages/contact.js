export async function render() {
  let template = document.createElement("section");
  template.classList.add("contact_page");
  template.innerHTML = `
      <div class="container">
          <div class="contact_form">
              <div class="form">
                  <div class="list">
                      <div class="item">
                          <label for="name">
                              <p>Họ và tên</p>
                          </label>
                          <input type="text" id="name" class="input name" required>
                      </div>
                      <div class="item">
                          <label for="email">
                              <p>Email</p>
                          </label>
                          <input type="email" id="email" class="input email" required>
                      </div>
                      <div class="item">
                          <label for="mess">
                              <p>Message</p>
                          </label>
                          <textarea name="mess" id="mess" rows="4" cols="50"></textarea>
                      </div>
                      <button> Gửi </button>
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
          <div class="ggmap">
              
          </div>
      </div>
        `;
  document.querySelector(".nav-bar a.active").classList.remove("active");
  document.querySelector(".nav-bar .contact").classList.add("active");

  return template;
}
