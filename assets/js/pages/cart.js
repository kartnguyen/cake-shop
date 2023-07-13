export async function render() {
  let template = document.createElement("div");
  template.innerHTML = `
      <section>
          <h2 style="color: #A66D56;">CART PAGE</h2>
      </section>
        `;
  document.querySelector(".nav-bar a.active").classList.remove("active");

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

  return template;
}
