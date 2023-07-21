import { chef } from "../components/help.js";

export async function render() {
  let template = document.createElement("section");
  template.classList.add("about_page");
  template.innerHTML = `
        <div class="content container">
          <div class="head">
            <h3>KarT's House</h3>
            <h3>Nơi Gửi Gắm Hương Vị Tuyệt Vời</h3>
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
            <div class="down">
              <i class="fa-solid fa-hand-point-down animated infinite bounce" style="color: gray; font-size: 36px"></i>
            </div>
          </div>
          <div class="content-item">
              <p data-aos="fade-right" data-aos-easing="linear"
              data-aos-duration="500">KarT's House là một cửa hàng bánh tuyệt vời đang gây sốt trong cộng đồng yêu thích ẩm thực. 
              Với sứ mệnh mang đến những hương vị ngọt ngào và độc đáo, chúng tôi đã trở thành điểm đến lý tưởng 
              cho những ai yêu mến ẩm thực và muốn trải nghiệm những trải nghiệm ẩm thực tuyệt vời.</p>

              <div class="img" style="background-image: url(./assets/images/cake/cake-9.jpg)" data-aos="fade-left" data-aos-easing="linear"
              data-aos-duration="500"></div>

              <div class="img" style="background-image: url(./assets/images/cake/cake-1.jpg)" data-aos="fade-right" data-aos-easing="linear"
              data-aos-duration="500"></div>

              <p data-aos="fade-left" data-aos-easing="linear"
              data-aos-duration="500">Khi bước vào KarT's House, bạn sẽ được chào đón bởi không gian ấm cúng và tinh tế, 
              tạo nên một không gian lý tưởng để thưởng thức những món bánh tuyệt hảo. Đội ngũ đầu 
              bếp tài năng và đam mê tại KarT's House luôn cống hiến để tạo ra những chiếc bánh độc
              đáo và thực sự ngon miệng.</p>

              <p data-aos="fade-right" data-aos-easing="linear"
              data-aos-duration="500">Chúng tôi tự hào giới thiệu một loạt các loại bánh đặc sản độc đáo và phong phú,
              từ những chiếc bánh mỳ mềm mịn với các hương vị đặc biệt cho đến những chiếc bánh ngọt
              mát và những món bánh kem truyền thống. Mỗi món bánh tại KarT's House đều được chế biến
              từ những nguyên liệu tươi ngon nhất và tinh tế nhất, đảm bảo cho bạn sự hài lòng tuyệt đối
              với mỗi miếng bánh.</p>

              <div class="img" style="background-image: url(./assets/images/cake/cake-6.jpg)" data-aos="fade-left" data-aos-easing="linear"
              data-aos-duration="500"></div>

              <div class="img" style="background-image: url(./assets/images/cake/cake-2.jpg)" data-aos="fade-right" data-aos-easing="linear"
              data-aos-duration="500"></div>

              <p data-aos="fade-left" data-aos-easing="linear"
              data-aos-duration="500">Không chỉ đáp ứng được những nhu cầu của khách hàng trong việc mua bánh, KarT's House
              còn cung cấp các dịch vụ làm bánh theo yêu cầu cho các dịp đặc biệt như sinh nhật, kỷ niệm,
              hay các buổi tiệc riêng tư. Đội ngũ chúng tôi luôn sẵn sàng lắng nghe ý kiến của
              khách hàng và tạo ra những món bánh tùy chỉnh theo sở thích và mong muốn của từng khách hàng.</p>

              <p data-aos="fade-right" data-aos-easing="linear"
              data-aos-duration="500">Tại KarT's House, chúng tôi coi trọng sự sáng tạo và chất lượng. Đội ngũ chúng tôi không
              ngừng nghiên cứu và tìm hiểu những xu hướng mới nhất trong lĩnh vực bánh ngọt để mang đến
              cho khách hàng những trải nghiệm ẩm thực độc đáo và đáng nhớ nhất.</p>

              <div class="img" style="background-image: url(./assets/images/cake/cake-12.jpg)" data-aos="fade-left" data-aos-easing="linear"
              data-aos-duration="500"></div>

              <div class="img" style="background-image: url(./assets/images/cake/cake-3.jpg)" data-aos="fade-right" data-aos-easing="linear"
              data-aos-duration="500"></div>
              
              <p data-aos="fade-left" data-aos-easing="linear"
              data-aos-duration="500">Hãy đến KarT's House và hòa mình vào thế giới bánh ngọt tuyệt vời. Chúng tôi cam kết đem
              đến cho bạn những trải nghiệm vị giác đáng nhớ và đậm đà, tạo dựng niềm tin và sự hài lòng
              với mỗi miếng bánh bạn thưởng thức. KarT's House sẽ là ngôi nhà của bạn, nơi bạn có thể
              tìm thấy những hương vị tuyệt vời.</p>
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