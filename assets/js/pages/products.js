import { api_url, endPoint, fetch_data, format_price } from "../components/help.js";
import { loading } from "../components/load.js";

export async function render() {
  let get_products = {
    api_url: api_url,
    end_point: endPoint.cake,
    method: "GET",
    async callback(params) {
      await loading.item();
      await render_products(params);
    },
  };

  let template = document.createElement("section");
  template.classList.add("products_page");
  template.innerHTML = `
  <div class="container">
    <div class="grid">
      <div class="side_container">
        <div class="side_bar">
          <ul>
              <li class="filter active">All</li>
              <li class="filter">Mood Cake</li>
              <li class="filter">Lover Cake</li>
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
      let { id, image, name, content, sub_title, price, quantity } = cake;
      let div = document.createElement("div");
      div.classList.add("item");
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
    }
  }

  document.querySelector(".nav-bar a.active").classList.remove("active");
  document.querySelector(".nav-bar .products").classList.add("active");

  await fetch_data(get_products);

  return template;
}

export async function side_bar() {
  window.addEventListener("scroll", function () {
    var side_bar = document.querySelector(".side_bar");

    var elementWidth = side_bar.offsetWidth;
    var scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
      side_bar.classList.add("sticky");
      document.querySelector(".side_bar").style.width = elementWidth + 'px';
    } else {
      side_bar.classList.remove("sticky");
    }
  });
}
