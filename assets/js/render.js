import { loading } from "./components/load.js";
import { removeLoader } from "./components/help.js";

let app = document.querySelector("main");

async function init_app() {
  app.appendChild(loading.cake_gif());
  setTimeout(removeLoader, 3600);

  if (location.pathname == "/") {
    let page = await import("./pages/home.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("products")) {
    let page = await import("./pages/products.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("about")) {
    let page = await import("./pages/about.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("contact")) {
    let page = await import("./pages/contact.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("cart")) {
    let page = await import("./pages/cart.js");
    let render = await page.render();
    app.appendChild(await render);
  }
}
init_app();
