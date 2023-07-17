import { api_url, endPoint, fetch_data } from "../components/help.js";
import { loading } from "../components/load.js";

export async function render() {
  let template = document.createElement("section");
  template.classList.add('products_page')
  template.innerHTML = `
  	<div class="container">
    </div>
	`;

  async function render_products(params) {
    template.querySelector(".container").innerHTML = "";
    for (let cake of params) {
      let { id, image, name, content, sub_title, price, quantity } = cake;

      let div = document.createElement("div");
      div.classList.add("item");
      div.innerHTML = `
            <div class="img" style="background-image: url(${image[0]});">
            </div>

            <div class="content">
                <h3>${name}</h3>
                <h4>${price} VND</h4>
            </div>
					`;

      template.querySelector(".container").appendChild(div);
    }
  }

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
