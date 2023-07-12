export async function render() {
  let template = document.createElement("div");
  template.innerHTML = `
    <section>
        <h2 style="color: #A66D56;">ABOUT PAGE</h2>
    </section>
      `;

  return template;
}
