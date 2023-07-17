import { api_url, endPoint, fetch_data } from "../components/help.js";
import { loading } from "../components/load.js";

export async function render(params) {
  let template = document.createElement("section");
  template.classList.add("products_details_page");
  let { id, image, name, content, sub_title, price, quantity } = params;
  template.innerHTML = `
  	<div class="container">
      <div class="img" style="background-image: url(${image[0]});">
      </div>
      <div class="content">
          <h3>${name}</h3>
          <h4>${sub_title}</h4>
          <h4>${price} VND</h4>
          <p>${content}</p>
      </div>
    </div>
	`;
  let jqueryScript = document.createElement("script");
  jqueryScript.src = "/assets/js/components/jquery-3.7.0.min.js";
  jqueryScript.async = true;
  jqueryScript.onload = function () {
    let owlCarouselScript = document.createElement("script");
    owlCarouselScript.src = "/assets/libs/owlcarousel/owl.carousel.min.js";
    owlCarouselScript.async = true;
    owlCarouselScript.onload = function () {
      let mainScript = document.createElement("script");
      mainScript.src = "/assets/js/main.js";
      mainScript.async = true;
      document.body.appendChild(mainScript);
    };
    document.body.appendChild(owlCarouselScript);
  };
  document.body.appendChild(jqueryScript);
  return template;
}
