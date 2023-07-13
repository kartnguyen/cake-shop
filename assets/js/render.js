import { loading } from "./components/load.js";
import { removeLoader } from "./components/help.js";

let app = document.querySelector("main");

async function init_app() {
  if (location.pathname == "/") {
    app.appendChild(await loading.cake_gif());
    await setTimeout(removeLoader, 3600);
    let page = await import("./pages/home.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("products")) {
    app.appendChild(await loading.cake_gif());
    await setTimeout(removeLoader, 1500);
    let page = await import("./pages/products.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("about")) {
    app.appendChild(await loading.cake_gif());
    await setTimeout(removeLoader, 1500);
    let page = await import("./pages/about.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("contact")) {
    app.appendChild(await loading.cake_gif());
    await setTimeout(removeLoader, 1500);
    let page = await import("./pages/contact.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("cart")) {
    app.appendChild(await loading.cake_gif());
    await setTimeout(removeLoader, 1500);
    let page = await import("./pages/cart.js");
    let render = await page.render();
    app.appendChild(await render);
  }
}
init_app();
