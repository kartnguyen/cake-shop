import { removeLoader, fetch_data } from "./components/help.js";

let app = document.querySelector("main");

async function init_app() {
  if (location.pathname == "/") {
    await setTimeout(removeLoader, 4100);
    let page = await import("./pages/home.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("products")) {
    await setTimeout(removeLoader, 2500);
    let page = await import("./pages/products.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("about")) {
    await setTimeout(removeLoader, 2500);
    let page = await import("./pages/about.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("contact")) {
    await setTimeout(removeLoader, 2500);
    let page = await import("./pages/contact.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("cart")) {
    await setTimeout(removeLoader, 2500);
    let page = await import("./pages/cart.js");
    let render = await page.render();
    app.appendChild(await render);
  }
  if (location.pathname.includes("product_detail")) {
    let pathname = location.pathname;
    pathname = pathname.split('/')[2];
    let get_products_by_id = {
      api_url: api_url,
      end_point: endPoint.cake + '/' + pathname,
      method: "GET",
      async callback(params) {
        await setTimeout(removeLoader, 2500);
        let page = await import("./pages/product_detail.js");
        let render = await page.render(params);
        app.appendChild(await render);
      }
    };
    await fetch_data(get_products_by_id)
  }
}
init_app();
