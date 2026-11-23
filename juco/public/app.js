const categories = document.querySelector("#categories");
const products = document.querySelector("#products");
const categoryPhoto = document.querySelector(".category-photo");
const drinkFrame = document.querySelector(".drink-frame");
const coverPhoto = document.querySelector(".cover-photo");
const template = document.querySelector("#product-template");
const order = document.querySelector("#order");
const openOrder = document.querySelector("#open-order");
const orderBar = document.querySelector(".order-bar");
const basket = document.querySelector("#basket");
const send = document.querySelector("#send");
const orderTotal = document.querySelector("#order-total");
const selection = [];
const currency = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
let currentPhoto;
let incomingSlide;
let outgoingFrame;

function itemSubtotal(item) {
  return item.quantity * (item.price + item.extras.reduce((sum, extra) => sum + extra.price, 0));
}

function orderLine(item) {
  const extras = item.extras.map(extra => extra.name).join(", ");
  return `${item.quantity} × ${item.label}${extras ? ` + ${extras}` : ""} · ${currency.format(itemSubtotal(item))}`;
}

function updateOrderSummary() {
  let count = 0;
  let total = 0;
  for (const item of selection) {
    count += item.quantity;
    total += itemSubtotal(item);
  }
  document.querySelector("#count").textContent = count;
  openOrder.setAttribute("aria-label", `Ver selección (${count} ${count === 1 ? "producto" : "productos"})`);
  orderBar.hidden = count === 0;
  orderTotal.hidden = count === 0;
  orderTotal.textContent = `Total: ${currency.format(total)} MXN`;
  send.hidden = !count || !menu.whatsapp;
  if (!send.hidden) {
    const message = [`Hola, ${menu.name}. Quisiera pedir:`, ...selection.map(orderLine), "", orderTotal.textContent].join("\n");
    send.href = `https://wa.me/${menu.whatsapp}?text=${encodeURIComponent(message)}`;
  }
}

function renderOrder() {
  basket.replaceChildren();
  for (const [index, item] of selection.entries()) {
    const row = document.createElement("li");
    const main = document.createElement("div");
    main.className = "basket-line";
    const line = document.createElement("span");
    line.textContent = orderLine(item);
    const remove = document.createElement("button");
    remove.textContent = "Quitar uno";
    remove.setAttribute("aria-label", `Quitar uno de ${item.label}`);
    remove.addEventListener("click", () => {
      if (item.quantity === 1) selection.splice(index, 1);
      else item.quantity -= 1;
      renderOrder();
      (basket.querySelector("button") ?? order.querySelector("button")).focus();
    });
    main.append(line, remove);
    row.append(main);
    if (item.isDrink) {
      const details = document.createElement("details");
      details.className = "basket-extras";
      const toggle = document.createElement("summary");
      toggle.textContent = "Extras";
      toggle.setAttribute("aria-label", `Extras para ${item.label}, producto ${index + 1}`);
      details.append(toggle);
      for (const extra of menu.extras) {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.extras.includes(extra);
        checkbox.addEventListener("change", () => {
          item.extras = menu.extras.filter(option => option === extra ? checkbox.checked : item.extras.includes(option));
          line.textContent = orderLine(item);
          updateOrderSummary();
        });
        label.append(checkbox, `${extra.name} · +${currency.format(extra.price)}`);
        details.append(label);
      }
      row.append(details);
    }
    basket.append(row);
  }
  if (!selection.length) {
    const row = document.createElement("li");
    row.textContent = "Tu selección está vacía.";
    basket.append(row);
  }
  updateOrderSummary();
}

function showCategory(index, updateCover = true) {
  const category = menu.categories[index];
  if (updateCover && category.photo !== currentPhoto) {
    const photo = category.photo;
    currentPhoto = photo;
    incomingSlide?.cancel();
    outgoingFrame?.remove();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      outgoingFrame = drinkFrame.cloneNode(true);
      outgoingFrame.classList.add("drink-frame-outgoing");
      outgoingFrame.setAttribute("aria-hidden", "true");
      drinkFrame.after(outgoingFrame);
      const frame = outgoingFrame;
      const timing = { duration: 360, easing: "cubic-bezier(.22,.75,.25,1)" };
      frame.animate([{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }], timing)
        .onfinish = () => frame.remove();
      incomingSlide = drinkFrame.animate([{ transform: "translateX(100%)" }, { transform: "translateX(0)" }], timing);
    }
    categoryPhoto.hidden = !photo;
    coverPhoto.hidden = Boolean(photo);
    if (photo) {
      const { x, y, width, height, alt } = photo;
      categoryPhoto.style.aspectRatio = `${width} / ${height}`;
      categoryPhoto.style.maxWidth = `${Math.min(100, width / height / 1.5 * 100)}%`;
      const image = categoryPhoto.querySelector("img");
      image.style.width = `${Number(image.getAttribute("width")) / width * 100}%`;
      image.style.left = `${-x / width * 100}%`;
      image.style.top = `${-y / height * 100}%`;
      image.alt = alt;
    }
  }
  document.querySelector("#category-title").textContent = category.name;
  for (const [position, button] of [...categories.children].entries()) {
    button.setAttribute("aria-pressed", position === index);
  }
  products.replaceChildren();
  for (const item of category.items) {
    const { name, prices = category.prices, price = category.price } =
      typeof item === "string" ? { name: item } : item;
    const card = template.content.cloneNode(true);
    card.querySelector("h4").textContent = name;
    const size = card.querySelector(".drink-size");
    size.hidden = !prices;
    size.setAttribute("aria-label", `Tamaño de ${name}`);
    for (const [index, label] of (prices ? menu.sizes : []).entries()) {
      size.add(new Option(`${label} · ${currency.format(prices[index])}`, label));
    }
    const variant = card.querySelector(".temperature");
    if (category.options) {
      variant.hidden = false;
      variant.setAttribute("aria-label", `Temperatura de ${name}`);
      for (const option of category.options) variant.add(new Option(option));
    }
    const milk = card.querySelector(".milk-preference");
    const milkSelect = milk.querySelector("select");
    if (category.milkOptions) {
      milk.hidden = false;
      milkSelect.setAttribute("aria-label", `Tipo de leche para ${name}`);
      for (const option of category.milkOptions) milkSelect.add(new Option(option));
    }
    const add = card.querySelector("button");
    if (!prices) add.textContent = `Agregar · ${currency.format(price)}`;
    add.setAttribute("aria-label", `Agregar ${name}`);
    add.addEventListener("click", () => {
      const detail = category.options ? ` · ${variant.value}` : "";
      const sizeDetail = prices ? ` · ${size.value}` : "";
      const milkDetail = category.milkOptions ? ` · Leche: ${milkSelect.value}` : "";
      const label = `${name}${sizeDetail}${detail}${milkDetail} (${category.name})`;
      const isDrink = Boolean(prices);
      const existing = isDrink ? undefined : selection.find(entry => entry.label === label);
      if (existing) existing.quantity += 1;
      else selection.push({ label, quantity: 1, price: prices?.[size.selectedIndex] ?? price, isDrink, extras: [] });
      renderOrder();
      const count = document.querySelector("#count");
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        count.getAnimations().forEach(animation => animation.cancel());
        count.animate([{ transform: "scale(1.22)" }, { transform: "scale(1)" }], {
          duration: 180,
          easing: "ease-out",
        });
      }
    });
    products.append(card);
  }
}

for (const [index, category] of menu.categories.entries()) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = category.name;
  button.addEventListener("click", () => showCategory(index));
  categories.append(button);
}
document.querySelector("#social").href = `https://www.instagram.com/${menu.instagram}/`;
if (menu.whatsapp) {
  const contact = document.querySelector("#contact-whatsapp");
  contact.href = `https://wa.me/${menu.whatsapp}`;
  contact.hidden = false;
}
openOrder.addEventListener("click", () => order.showModal());
showCategory(0, false);
renderOrder();
