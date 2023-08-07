import {
  api_url,
  endPoint,
  removeLoader,
  fetch_data,
  main,
  renderIcon,
} from "./components/help.js";
import { loading } from "./components/load.js";
import { render_header } from "./components/header.js";
import { render_footer } from "./components/footer.js";

let app = document.querySelector("main");
let header = document.querySelector("header");
let footer = document.querySelector("footer");

async function init_app() {
  app.appendChild(loading.cake_gif());
  header.appendChild(await render_header());
  footer.appendChild(await render_footer());

  if (location.pathname == "/") {
    let page = await import("./pages/home.js");
    let render = await page.render();
    app.appendChild(await render);
    await main();
    await renderIcon();
    await page.callback();
  }
  if (location.pathname.includes("products")) {
    let page = await import("./pages/products.js");
    let render = await page.render();
    app.appendChild(await render);
    await main();
    await renderIcon();
    await page.side_bar();
  }
  if (location.pathname.includes("about")) {
    let page = await import("./pages/about.js");
    let render = await page.render();
    app.appendChild(await render);
    await main();
    await renderIcon();
    await page.callback();
  }
  if (location.pathname.includes("contact")) {
    let page = await import("./pages/contact.js");
    let render = await page.render();
    app.appendChild(await render);
    await main();
    await renderIcon();
    await page.callback();
  }
  if (location.pathname.includes("cart")) {
    let page = await import("./pages/cart.js");
    let render = await page.render();
    app.appendChild(await render);
    await main();
    await page.callback();
    await renderIcon();
  }
  if (location.pathname.includes("product_detail")) {
    let page = await import("./pages/product_detail.js");
    let pathname = location.pathname;
    pathname = pathname.split("/")[2];
    let get_products_by_id = {
      api_url: api_url,
      end_point: endPoint.cake + "/" + pathname,
      method: "GET",
      async callback(params) {
        let render = await page.render(params);
        app.appendChild(await render);
        await main();
        await page.render_cake_img();
        await renderIcon();
        await page.callback(params);
        await page.remove();
      },
    };
    await fetch_data(get_products_by_id);
  }
  if (location.pathname.includes("checkout")) {
    let page = await import("./pages/checkout.js");
    let render = await page.render();
    app.appendChild(await render);
    await main();
    await renderIcon();
    await page.callback();
  }
}
init_app();
