import {
  api_url,
  endPoint,
  fetch_data,
  format_price,
  removeLoader,
} from "../components/help.js";

export async function render() {
  let get_products = {
    api_url: api_url,
    end_point: endPoint.cake,
    method: "GET",
    async callback(params) {
      await render_products(params);
    },
  };

  let template = document.createElement("section");
  template.classList.add("products_page");
  template.innerHTML = `
  <div class="container">
    <div class="head">
      <h1>Bánh sinh nhật</h1>
      <p>Sản phẩm đặc trưng của <b><i>KarT's House</i></b> là bánh Entremet – dòng bánh lạnh cao cấp nhất của Pháp, với sự hài hoà của các tầng hương vị và kết cấu đặc biệt trong từng chiếc bánh.</p>
    </div>
    <div class="grid">
      <div class="side_container">
        <div class="side_bar">
          <ul>
              <li class="filter active all">
                <a href="#">All</a>
              </li>
              <li class="filter mood_cake">
                <a href="#">Mood Cake</a>
              </li>
              <li class="filter lover_cake">
                <a href="#">Lover Cake</a>
              </li>
          </ul>
        </div>
      </div>
      <div class="products">
      </div>    
    </div>
  </div>
	`;

  async function render_products(params) {
    template.querySelector(".products").innerHTML = "";
    for (let cake of params) {
      let { id, image, name, content, sub_title, price, quantity, category } =
        cake;
      let div = document.createElement("div");
      div.classList.add("item");
      div.setAttribute("data-cate", category);
      let formattedPrice = await format_price(price);
      div.innerHTML = `
          <a href="/product_detail/${id}">
            <div class="img" style="background-image: url(${image[0]});">
            </div>
          </a>

            <div class="content">
              <a href="/product_detail/${id}">
                <h3>${name}</h3>
              </a>
              <h4>${formattedPrice}</h4>
            </div>
					`;

      template.querySelector(".products").appendChild(div);

      const divElements = template.querySelectorAll("div[data-cate]");

      function filterDivByAttribute(category) {
        const filteredDivs = Array.from(divElements).filter((div) => {
          const cateAttributeValue = div.getAttribute("data-cate");
          return cateAttributeValue.includes(category);
        });
        return filteredDivs;
      }

      template
        .querySelector(".all")
        .addEventListener("click", function (event) {
          template.querySelector(".products").appendChild(div);
        });

      template
        .querySelector(".mood_cake")
        .addEventListener("click", function (event) {
          const filteredDivs = filterDivByAttribute("mc");
          template.querySelector(".products").innerHTML = "";

          filteredDivs.forEach((div) => {
            template.querySelector(".products").appendChild(div);
          });
        });

      template
        .querySelector(".lover_cake")
        .addEventListener("click", function (event) {
          const filteredDivs = filterDivByAttribute("lc");
          template.querySelector(".products").innerHTML = "";

          filteredDivs.forEach((div) => {
            template.querySelector(".products").appendChild(div);
          });
        });
    }
  }

  template.querySelectorAll(".filter").forEach(function (item) {
    item.addEventListener("click", function (event) {
      template.querySelectorAll(".filter").forEach(function (filterItem) {
        filterItem.classList.remove("active");
      });

      item.classList.add("active");
    });
  });

  document.querySelector(".nav-bar a.active").classList.remove("active");
  document.querySelector(".nav-bar .products").classList.add("active");

  await fetch_data(get_products);

  return template;
}

export async function side_bar() {
  await removeLoader();
  window.addEventListener("scroll", function () {
    var side_bar = document.querySelector(".side_bar");

    var elementWidth = side_bar.offsetWidth;
    var scrollPosition = window.scrollY;

    if (scrollPosition > 220) {
      side_bar.classList.add("sticky");
      document.querySelector(".side_bar").style.width = elementWidth + "px";
    } else {
      side_bar.classList.remove("sticky");
    }
  });
}
