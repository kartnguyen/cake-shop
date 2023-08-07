export async function render_footer() {
    let template = document.createElement("div");
    template.innerHTML = `
    <div class="container footer">
        <div class="row">
            <div class="img">
                <img src="/assets/images/logo.svg" alt="">
            </div>
            <div class="col">
                <div class="name">
                    <h3>Thời gian làm việc</h3>
                </div>
                <div class="content">
                    <p>Thứ 2 - Thứ 6: 8 am - 8 pm</p>
                    <p>Thứ 7: 9am - 4pm</p>
                    <p>Chủ nhật: Đóng cửa</p>
                </div>
            </div>
            <div class="col">
                <div class="name">
                    <h3>Địa chỉ</h3>
                </div>
                <div class="content">
                    <p>Kart's House</p>
                    <p>Số 94 Yên Nghĩa, Hà Đông, Hà Nội</p>
                    <p>thanhnguyen.gt09@gmail.com</p>
                </div>
            </div>
            <div class="col">
                <div class="name">
                    <h3>Mạng xã hội</h3>
                </div>
                <div class="content">
                    <div>
                        <a target="_blank" href="https://www.facebook.com/">
                            <i class="fa-brands fa-facebook fa-2x" style="color: #453cedc6;"></i>
                            Facebook
                        </a>
                        <a target="_blank" href="https://www.instagram.com/">
                            <i class=" fa-2x fa-brands fa-instagram" style="color: #ff6d2e;"></i>
                            Instagram
                        </a>
                    </div>
                    <div class="social">
                        <a target="_blank" href="https://www.youtube.com/">
                            <i class="fa-2x fa-brands fa-youtube" style="color: #d70f0f;"></i>
                            Youtube
                        </a>
                        <a target="_blank" href="https://twitter.com/" style="margin-left: 18px;" class="twitter">
                            <i class="fa-2x fa-brands fa-twitter" style="color: #57e3ff;"></i>
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="copyright">
            <span>Copyright © 2023-Powered by Thanh Nguyen</span>
        </div>
    </div>
    `;
    return template;
  }
  