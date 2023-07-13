import { api_url, endPoint, fetch_data } from "../components/help.js";
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
  template.classList.add('products_page')
  template.innerHTML = `
  	<div class="container">
        <div class="grid">
          <div class="side_bar">
              <ul>
                  <li>banh 1</li>
                  <li>banh 2</li>
                  <li>banh 3</li>
              </ul>
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
      div.innerHTML = `
          <div class="img" style="background-image: url(${image[0]});">
          </div>

          <div class="content">
              <h3>${name}</h3>
              <h4>${price}</h4>
              <button>Add to cart</button>
          </div>
					`;

      template.querySelector(".products").appendChild(div);
    }
  }

  let productsCss = document.createElement("link");
  productsCss.href = "./assets/css/products.css";
  productsCss.rel = "stylesheet";
  productsCss.type = "text/css";
  document.head.appendChild(productsCss);

  document.querySelector(".nav-bar a.active").classList.remove("active");
  document.querySelector(".nav-bar .products").classList.add("active");

  let jqueryScript = document.createElement("script");
  jqueryScript.src = "./assets/js/components/jquery-3.7.0.min.js";
  jqueryScript.async = true;
  jqueryScript.onload = function () {
    let owlCarouselScript = document.createElement("script");
    owlCarouselScript.src = "./assets/libs/owlcarousel/owl.carousel.min.js";
    owlCarouselScript.async = true;
    owlCarouselScript.onload = function () {
      let mainScript = document.createElement("script");
      mainScript.src = "./assets/js/main.js";
      mainScript.async = true;
      document.body.appendChild(mainScript);
    };
    document.body.appendChild(owlCarouselScript);
  };
  document.body.appendChild(jqueryScript);

  let aosScript = document.createElement("script");
  aosScript.src = "./assets/libs/aos-master/aos.js";
  aosScript.async = true;
  document.body.appendChild(aosScript);

  aosScript.onload = function () {
    AOS.init();
  };

  await fetch_data(get_products);

  return template;
}
