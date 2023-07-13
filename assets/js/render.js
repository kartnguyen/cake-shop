import { loading } from "./components/load.js";
import { removeLoader } from "./components/help.js";

let app = document.querySelector("main");

async function init_app() {
  app.appendChild(loading.cake_gif());

  if (location.pathname == "/") {
    setTimeout(removeLoader, 3600);
    let page = await import("./pages/home.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("products")) {
    setTimeout(removeLoader, 1500);
    let page = await import("./pages/products.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("about")) {
    setTimeout(removeLoader, 1500);
    let page = await import("./pages/about.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("contact")) {
    setTimeout(removeLoader, 1500);
    let page = await import("./pages/contact.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("cart")) {
    setTimeout(removeLoader, 1500);
    let page = await import("./pages/cart.js");
    let render = await page.render();
    app.appendChild(await render);
  }
}
init_app();
