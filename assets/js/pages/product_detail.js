import { loading } from "../components/load.js";

export async function render(params) {
  let template = document.createElement("section");
  template.classList.add("products_details_page");
  let { id, image, name, content, sub_title, price, quantity } = params;
  template.innerHTML = `
  	<div class="container">
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

    let slickScript = document.createElement("script");
    slickScript.src = "/assets/libs/slick/slick.min.js";
    slickScript.async = true;
    document.body.appendChild(slickScript);
  };
  document.body.appendChild(jqueryScript);
  return template;
}

export async function slick_cake() {

}

export async function render_cake(params) {
  let img_div = document.querySelector(".products_details_page .container");
  let content_div = img_div.querySelector(".content");
  console.log(img_div)
  console.log(content_div)

  img_div.innerHTML = "";
  for (let img of params) {
    let cake_img = document.createElement("div");
    cake_img.classList.add('img');
    cake_img.innerHTML = `
    <div class="slider-for">
      <div class="cake-img" style="background-image: url(${img})"></div>
    </div>
    <div class="slider-nav">
      <div class="cake-img" style="background-image: url(${img})"></div>
    </div>
  `;
    img_div.insertBefore(cake_img,content_div);
  }
}
