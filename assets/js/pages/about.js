import { chef } from "../components/help.js";

export async function render() {
  let template = document.createElement("section");
  template.classList.add("about_page");
  template.innerHTML = `
        <div class="content container">
          <div class="head">
            <h3>KarT's House - Nơi Gửi Gắm Hương Vị Tuyệt Vời</h3>
            <div class="head_img">
              <div>
                <div class="img" style="background-image: url(./assets/images/chef/LF_Chat-luong_Illus.webp)"></div>
                <h4>Chất lượng</h4>
                <p>Để mang lại trải nghiệm đáng nhớ trong từng chiếc bánh, sản phẩm của KarT's House được làm từ
                những nguyên liệu được chọn lựa cẩn thận và hoàn thiện tỉ mỉ với những tiêu chuẩn cao cấp
                nhất.</p>
              </div>
              <div>
                <div class="img" style="background-image: url(./assets/images/chef/LF_Danh-cho-moi-nguoi_Illus.webp)"></div>
                <h4>Cho mọi người</h4>
                <p>Bánh của KarT's House được nghiên cứu để phù hợp với khẩu vị của người Việt và luôn được đóng gói
                chỉnh chu để ai cũng có thể nhận về những niềm vui khi bánh được giao tới tận nơi.</p>
              </div>
              <div>
                <div class="img" style="background-image: url(./assets/images/chef/LF_Su-chan-thanh_Illus.webp)"></div>
                <h4>Sự chân thành</h4>
                <p>Đối với KarT's House, giá trị lớn nhất mà chúng tôi đề cao là sự chân thành. 
                Niềm vui của mọi nguời khi thưởng thức bánh, chính là nguồn động lực cho chúng tôi làm việc mỗi ngày.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container chef_infor">
            <div class="about">
                <h3>Our Chef</h3>
                <p>Các đầu bếp của KarT's House đều đã tốt nghiệp chuyên ngành bánh ngọt Pháp (Diplôme de Pâtisserie)
                 tại Le Cordon Bleu - học viện ẩm thực hàng đầu thế giới với lịch sử gần 130 năm hình thành. 
                 Trải qua nhiều vị trí khác nhau tại các chuỗi bánh lớn ở Hà Nội, 
                 các đầu bếp đã dành trọn tình cảm cho sự tinh tế của bánh ngọt Pháp & đặt quyết tâm
                  trở thành một Pastry Chef chuyên nghiệp.</p>
            </div>
            <div class="profile"></div>
        </div>
      `;
  async function render_chef(params) {
    for (let chef of params) {
      let { avatar, name, job } = chef;

      let div = document.createElement("div");
      div.classList.add("chef");
      div.innerHTML = `
    <img src= "${avatar}">
    <h3>${name}</h3>
    <p>${job}</p>
    <div class="profile-footer">
        <ul class="social-list">
            <li class="item">
                <a href="#">
                    <i class="fa-brands fa-facebook"></i>
                </a>
            </li>
            <li class="item">
                <a href="#">
                    <i aria-hidden="true" class="fab fa-twitter"></i>
                </a>
            </li>
            <li class="item">
                <a href="#">
                    <i aria-hidden="true" class="fab fa-instagram"></i>
                </a>
            </li>
            <li class="item">
                <a href="#">
                    <i aria-hidden="true" class="fab fa-pinterest-p"></i>
                </a>
            </li>
        </ul>
    </div>
                      `;

      template.querySelector(".profile").appendChild(div);
    }
  }
  render_chef(chef);

  document.querySelector(".nav-bar a.active").classList.remove("active");
  document.querySelector(".nav-bar .about").classList.add("active");

  return template;
}

export async function callback() {
  AOS.init();
}