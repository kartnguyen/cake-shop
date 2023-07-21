export async function render() {
  let template = document.createElement("div");
  template.innerHTML = `
  <section>
  <div class="container">
    <h2 style="color: #A66D56;">CONTACT PAGE</h2>
  </div>
</section>
        `;
  document.querySelector(".nav-bar a.active").classList.remove("active");
  document.querySelector(".nav-bar .contact").classList.add("active");

  return template;
}
