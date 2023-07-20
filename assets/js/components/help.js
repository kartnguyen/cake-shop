export const api_url = "https://64a662ab096b3f0fcc7fa7e0.mockapi.io/";
export const endPoint = {
  cake: "cake",
};

export async function fetch_data(params) {
  if (!params) {
    alert("không tồn tại request");
    return false;
  }
  let { api_url, end_point, method, callback } = params;

  try {
    let res = await fetch(api_url + end_point, {
      method: method,
    });

    let data = await res.json();
    await callback(data);
  } catch (error) {
    console.log(error);
  }
}

export async function removeLoader() {
  document.querySelectorAll(".loader").forEach((loader) => {
    loader.remove();
  });
}

export const chef = [
  {
    name: "Tuấn Hưng",
    avatar: "./assets/images/chef/chef_1.jpg",
    job: '"Nghệ sĩ điêu khắc" bánh ngọt',
  },
  {
    name: "Mỹ Tâm",
    avatar: "./assets/images/chef/chef_2.jpg",
    job: "Nữ đầu bếp được yêu mến",
  },
  {
    name: "Đen Vâu",
    avatar: "./assets/images/chef/chef_3.jpg",
    job: "Chuyên gia về bánh ngọt",
  },
];

export async function main() {
  window.addEventListener("scroll", function (e) {
    if (window.pageYOffset > 20) {
      document.querySelector("header").classList.add("fixed-top");
      document
        .querySelector(".back-to-top")
        .classList.add("show", "animated", "infinite", "pulse");
    } else {
      document.querySelector("header").classList.remove("fixed-top");
      document
        .querySelector(".back-to-top")
        .classList.remove("show", "animated", "infinite", "pulse");
    }
  });

  let template = document.body;

  function handle_mobile_nav() {
    let btn = template.querySelector(".navbar-dropdown"),
      nav = template.querySelector("header nav"),
      overlay = document.createElement("div");
    overlay.classList.add("overlay");

    if (btn) {
      btn.addEventListener("click", (e) => {
        template.classList.add("overflow-hidden");
        template.querySelector("header .row").appendChild(overlay);
        nav.className = "show animated bounceInLeft";
      });

      overlay.addEventListener("click", (e) => {
        template.classList.remove("overflow-hidden");
        overlay.remove();
        nav.className = "show animated bounceOutLeft";
        setTimeout(() => {
          nav.className = "";
        }, 300);
      });
    }
  }
  handle_mobile_nav();
}

export async function format_price(params) {
  return params.toLocaleString("vi-VN") + " ₫";
}
