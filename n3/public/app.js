const categories = document.querySelector("#categories");
const drinkCategories = menu.categories.filter(category => category.layout === "drinks");
const drinkTabs = [{ name: "Todos", layout: "drinks", all: true }, ...drinkCategories];
let stopDrinkCarousel;
const products = document.querySelector("#products");
const template = document.querySelector("#product-template");
const order = document.querySelector("#order");
const openOrder = document.querySelector("#open-order");
const orderCount = document.querySelector("#count");
const basket = document.querySelector("#basket");
const send = document.querySelector("#send");
const orderTotal = document.querySelector("#order-total");
const selection = [];
const currency = new Intl.NumberFormat("es-MX", { style: "currency", currency: menu.currency });
const pendingPrice = "$0.0";

function hasPrice(item) {
  return Number.isFinite(item.price) && item.extras.every(extra => Number.isFinite(extra.price));
}

function itemSubtotal(item) {
  return item.quantity * (item.price + item.extras.reduce((sum, extra) => sum + extra.price, 0));
}

function orderItemLabel(item) {
  const extras = item.extras.map(extra => extra.name).join(", ");
  return `${item.quantity} × ${item.label}${extras ? ` + ${extras}` : ""}`;
}

function orderLine(item) {
  const amount = hasPrice(item) ? currency.format(itemSubtotal(item)) : pendingPrice;
  return `${orderItemLabel(item)} · ${amount}`;
}

function updateOrderSummary() {
  let count = 0;
  let total = 0;
  for (const item of selection) {
    count += item.quantity;
    if (hasPrice(item)) total += itemSubtotal(item);
  }
  orderCount.textContent = count;
  orderCount.hidden = count === 0;
  openOrder.setAttribute("aria-label", count ? `Ver selección (${count} ${count === 1 ? "producto" : "productos"})` : "Ver selección vacía");
  orderTotal.hidden = count === 0;
  const hasPendingPrices = selection.some(item => !hasPrice(item));
  const totalLabel = hasPendingPrices && total > 0 ? "Subtotal con precio" : "Total";
  orderTotal.textContent = `${totalLabel}: ${hasPendingPrices && !total ? pendingPrice : `${currency.format(total)} ${menu.currency}`}`;
  const destination = menu.orderWhatsapp || menu.whatsapp;
  send.hidden = !count || !destination;
  if (!send.hidden) {
    const lines = selection.map(item => hasPrice(item) ? orderLine(item) : orderItemLabel(item));
    const summary = !hasPendingPrices || total > 0 ? [orderTotal.textContent] : [];
    if (hasPendingPrices) summary.push("¿Me confirman los precios faltantes y la disponibilidad?");
    const message = [`Hola, ${menu.name}. Quisiera pedir:`, ...lines, "", ...summary].join("\n");
    send.href = `https://wa.me/${destination}?text=${encodeURIComponent(message)}`;
  } else {
    send.removeAttribute("href");
  }
}

const extrasSheet = document.querySelector("#extras-sheet");
const extrasConfig = document.querySelector("#extras-config");
const extrasOptions = document.querySelector("#extras-options");
let extrasIndex;

function showExtras(item, index) {
  extrasIndex = index;
  document.querySelector("#extras-item").textContent = `${item.quantity} × ${item.label}`;
  extrasOptions.replaceChildren();
  for (const [index, extra] of item.extrasAvailable.entries()) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "extra";
    checkbox.value = index;
    checkbox.checked = item.extras.includes(extra);
    const amount = document.createElement("span");
    amount.textContent = `+${Number.isFinite(extra.price) ? currency.format(extra.price) : pendingPrice}`;
    label.append(checkbox, extra.name, amount);
    extrasOptions.append(label);
  }
  extrasSheet.showModal();
}

extrasConfig.addEventListener("submit", event => {
  event.preventDefault();
  const item = selection[extrasIndex];
  item.extras = new FormData(extrasConfig).getAll("extra").map(index => item.extrasAvailable[Number(index)]);
  extrasSheet.close();
  renderOrder();
  basket.children[extrasIndex].querySelector(".basket-extra-button").focus();
});

function renderOrder() {
  basket.replaceChildren();
  for (const [index, item] of selection.entries()) {
    const row = document.createElement("li");
    const main = document.createElement("div");
    main.className = "basket-line";
    const line = document.createElement("span");
    line.className = "basket-item-text";
    line.textContent = orderLine(item);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "basket-remove";
    remove.textContent = "−";
    remove.setAttribute("aria-label", `Quitar uno de ${item.label}`);
    remove.addEventListener("click", () => {
      if (item.quantity === 1) selection.splice(index, 1);
      else item.quantity -= 1;
      renderOrder();
      (basket.querySelector("button") ?? order.querySelector("button")).focus();
    });
    const controls = document.createElement("div");
    controls.className = "basket-item-controls";
    if (item.extrasAvailable.length) {
      const extraButton = document.createElement("button");
      extraButton.type = "button";
      extraButton.className = "basket-extra-button";
      extraButton.textContent = item.extras.length ? "Editar extras" : "+ Extras";
      extraButton.setAttribute("aria-label", `${extraButton.textContent} para ${item.label}`);
      extraButton.setAttribute("aria-haspopup", "dialog");
      extraButton.addEventListener("click", () => showExtras(item, index));
      controls.append(extraButton);
    }
    controls.append(remove);
    main.append(line, controls);
    row.append(main);
    basket.append(row);
  }
  if (!selection.length) {
    const row = document.createElement("li");
    row.textContent = "Tu selección está vacía.";
    basket.append(row);
  }
  updateOrderSummary();
}

const sheet = document.querySelector("#product-sheet");
const config = document.querySelector("#product-config");
const quantityInput = config.elements.quantity;
const quantityMinus = document.querySelector("#quantity-minus");
const quantityPlus = document.querySelector("#quantity-plus");
const quantityDisplay = document.querySelector("#quantity-display");
let activeProduct;

function showOptions(selector, name, choices, prices = [], pricePrefix = "") {
  const fieldset = config.querySelector(selector);
  const list = fieldset.querySelector("div");
  list.replaceChildren();
  fieldset.hidden = !choices.length;
  for (const [index, choice] of choices.entries()) {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = name;
    radio.value = choice;
    radio.checked = index === 0;
    const price = prices[index];
    label.append(radio, choice);
    if (Number.isFinite(price)) {
      const amount = document.createElement("span");
      amount.textContent = `${pricePrefix}${currency.format(price)}`;
      label.append(amount);
    }
    list.append(label);
  }
}

function chosenPrice() {
  const values = new FormData(config);
  const index = activeProduct.sizes.indexOf(values.get("size"));
  const base = activeProduct.prices?.[index] ?? activeProduct.price;
  const flavor = activeProduct.flavors.find(option => option.name === values.get("flavor"));
  const milk = activeProduct.milks.find(option => option.name === values.get("milk"));
  return Number.isFinite(base) ? base + (flavor?.price ?? 0) + (milk?.price ?? 0) : base;
}

function updateSheetPrice() {
  const price = chosenPrice();
  const quantity = Number(quantityInput.value);
  document.querySelector("#sheet-price").textContent = Number.isFinite(price)
    ? currency.format(price * (quantity || 1))
    : pendingPrice;
}

config.addEventListener("input", updateSheetPrice);
function updateQuantity(amount) {
  const quantity = Math.min(99, Math.max(1, amount));
  quantityInput.value = quantity;
  quantityDisplay.value = quantity;
  quantityMinus.disabled = quantity === 1;
  quantityPlus.disabled = quantity === 99;
  updateSheetPrice();
}
quantityMinus.addEventListener("click", () => updateQuantity(Number(quantityInput.value) - 1));
quantityPlus.addEventListener("click", () => updateQuantity(Number(quantityInput.value) + 1));

config.addEventListener("submit", event => {
  event.preventDefault();
  const values = new FormData(config);
  const { name, category, extras } = activeProduct;
  const milk = values.get("milk");
  const flavor = values.get("flavor");
  const options = [
    values.get("size"), values.get("temperature"),
    milk ? `Leche: ${milk}` : null, flavor ? `Sabor: ${flavor}` : null,
  ];
  const label = `${[name, ...options.filter(Boolean)].join(" · ")} (${category})`;
  const quantity = Number(quantityInput.value);
  const price = chosenPrice();
  const extrasAvailable = menu.extras.filter(extra => extras.includes(extra.name));
  const existing = extrasAvailable.length ? undefined : selection.find(entry => entry.label === label && entry.price === price);
  if (existing) existing.quantity += quantity;
  else selection.push({ label, quantity, price, extrasAvailable, extras: [] });
  sheet.close();
  renderOrder();
});

function showProduct(item, category) {
  const product = typeof item === "string" ? { name: item } : item;
  document.querySelector("#sheet-title").textContent = product.name;
  document.querySelector("#sheet-category").textContent = category.name;
  const description = sheet.querySelector("#sheet-description");
  description.textContent = product.description ?? category.note ?? "";
  description.hidden = !description.textContent;
  const image = sheet.querySelector("#sheet-image");
  const imageUrl = product.image ?? category.image;
  image.hidden = !imageUrl;
  if (imageUrl) {
    image.src = imageUrl;
    image.alt = product.image ? product.imageAlt ?? product.name : category.imageAlt;
  }
  const prices = product.prices ?? category.prices;
  const sizes = product.sizes ?? category.sizes ?? [];
  const flavors = product.flavorOptions ?? category.flavorOptions ?? [];
  const milks = (product.milkOptions ?? category.milkOptions ?? []).map(option =>
    typeof option === "string" ? { name: option } : option);
  activeProduct = {
    name: product.name, category: category.name, sizes, prices, flavors, milks,
    price: product.price ?? category.price,
    extras: product.extras ?? category.extras ?? [],
  };
  config.reset();
  showOptions("#sheet-sizes", "size", sizes, prices);
  showOptions("#sheet-temperatures", "temperature", product.options ?? category.options ?? []);
  showOptions("#sheet-milks", "milk", milks.map(option => option.name), milks.map(option => option.price), "+");
  showOptions("#sheet-flavors", "flavor", flavors.map(option => option.name),
    flavors.map(option => option.price > 0 ? option.price : undefined));
  updateQuantity(1);
  sheet.showModal();
  sheet.scrollTop = 0;
}

function showCategory(index) {
  const category = drinkTabs[index];
  renderDrinkList(category.all ? drinkCategories : [category]);
  stopDrinkCarousel?.();
  stopDrinkCarousel = undefined;
  const heading = document.querySelector("#category-title");
  heading.textContent = category.name;
  heading.hidden = category.all === true;
  products.setAttribute("aria-labelledby", category.all ? "menu-title" : heading.id);
  const note = document.querySelector("#category-note");
  note.hidden = !category.note;
  note.textContent = category.note ?? "";
  for (const [position, button] of [...categories.children].entries()) {
    button.setAttribute("aria-pressed", position === index);
  }
  products.replaceChildren();
  products.dataset.layout = category.layout ?? "compact";
  products.toggleAttribute("data-autoscroll", category.all === true);
  products.scrollLeft = 0;
  if (category.all) {
    const track = document.createElement("div");
    track.className = "drink-track";
    const repeatedTrack = document.createElement("div");
    repeatedTrack.className = "drink-track";
    repeatedTrack.setAttribute("aria-hidden", "true");
    for (const group of drinkCategories) {
      for (const item of group.items) {
        track.append(productCard(item, group));
        repeatedTrack.append(productCard(item, group, 0, true));
      }
    }
    products.append(track, repeatedTrack);
    stopDrinkCarousel = autoCarousel(products, track, repeatedTrack);
    return;
  }
  for (const [position, item] of category.items.entries()) {
    products.append(productCard(item, category, Math.min(position, 8) * 36));
  }
}

function productCard(item, category, delay = 0, repeated = false) {
  const product = typeof item === "string" ? { name: item } : item;
  const card = template.content.cloneNode(true);
  card.firstElementChild.style.setProperty("--entrance-delay", `${delay}ms`);
  card.querySelector(".product-name").textContent = product.name;
  const price = product.price ?? category.price;
  if (Number.isFinite(price)) {
    const amount = card.querySelector(".product-price");
    amount.textContent = currency.format(price);
    amount.hidden = false;
  }
  const image = card.querySelector(".product-image");
  const cardImage = product.image ?? product.thumbnail ?? category.thumbnail;
  if (cardImage) {
    image.src = cardImage;
    image.hidden = false;
  }
  let add = card.querySelector(".product-add");
  if (repeated) {
    const pointerControl = document.createElement("span");
    pointerControl.className = add.className;
    pointerControl.append(...add.childNodes);
    add.replaceWith(pointerControl);
    add = pointerControl;
  }
  add.setAttribute("aria-label", `Agregar ${product.name}`);
  add.addEventListener("click", () => showProduct(product, category));
  return card;
}

const drinkList = document.querySelector(".drink-list");
const drinkListGroups = document.querySelector("#drink-list-groups");
function renderDrinkList(visibleCategories) {
  drinkListGroups.replaceChildren();
  for (const category of visibleCategories) {
    if (!category.items.length) continue;
    const group = document.createElement("div");
    group.className = "drink-list-group";
    const heading = document.createElement("h4");
    heading.textContent = category.name;
    const items = document.createElement("ul");
    for (const item of category.items) {
      const product = typeof item === "string" ? { name: item } : item;
      const row = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = product.name;
      const amount = document.createElement("span");
      amount.className = "drink-list-price";
      const price = product.price ?? category.price;
      amount.textContent = Number.isFinite(price) ? currency.format(price) : pendingPrice;
      const add = document.createElement("button");
      add.type = "button";
      add.textContent = "+";
      add.setAttribute("aria-label", `Agregar ${product.name} de ${category.name}`);
      add.setAttribute("aria-haspopup", "dialog");
      add.addEventListener("click", () => showProduct(product, category));
      row.append(name, amount, add);
      items.append(row);
    }
    group.append(heading, items);
    drinkListGroups.append(group);
  }
  drinkList.hidden = !drinkListGroups.children.length;
}

const pastryRail = document.querySelector("#pastry-rail");
const pastryCards = document.querySelector("#pastry-cards");
const repeatedPastries = document.createElement("div");
repeatedPastries.className = pastryCards.className;
repeatedPastries.dataset.layout = pastryCards.dataset.layout;
repeatedPastries.setAttribute("aria-hidden", "true");
for (const category of menu.categories.filter(entry => entry.layout !== "drinks")) {
  for (const item of category.items) {
    pastryCards.append(productCard(item, category));
    repeatedPastries.append(productCard(item, category, 0, true));
  }
}
document.querySelector(".pastry-showcase").hidden = !pastryCards.children.length;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (pastryCards.children.length) {
  pastryRail.append(repeatedPastries);
  autoCarousel(pastryRail, pastryCards, repeatedPastries, -1);
}

function autoCarousel(rail, track, repeatedTrack, direction = 1) {
  const controller = new AbortController();
  const options = { signal: controller.signal };
  let frame;
  let touchedCard = false;
  let hoveredCard = false;
  let keyboardInput = false;
  let lastTime = 0;
  let remainder = 0;

  document.addEventListener("pointerdown", event => {
    keyboardInput = false;
    if (!rail.contains(event.target)) hoveredCard = false;
    touchedCard = event.pointerType !== "mouse" &&
      rail.contains(event.target) &&
      Boolean(event.target.closest(".product"));
  }, options);
  document.addEventListener("keydown", () => { keyboardInput = true; }, options);
  rail.addEventListener("pointermove", event => {
    hoveredCard = event.pointerType === "mouse" && Boolean(event.target.closest(".product"));
  }, options);
  rail.addEventListener("pointerleave", () => { hoveredCard = false; }, options);
  rail.addEventListener("pointercancel", () => { touchedCard = false; }, options);
  sheet.addEventListener("close", () => {
    touchedCard = false;
    hoveredCard = false;
    if (!keyboardInput && rail.contains(document.activeElement)) document.activeElement.blur();
  }, options);

  function advance(time) {
    const elapsed = Math.min(time - lastTime, 50);
    lastTime = time;
    const cycleWidth = track.offsetWidth;
    const keyboardFocus = keyboardInput && rail.contains(document.activeElement);
    if (cycleWidth > rail.clientWidth && !touchedCard && !reducedMotion.matches && !sheet.open && !order.open &&
        !hoveredCard && !keyboardFocus) {
      const distance = rail.scrollLeft + elapsed * .035 * direction + remainder;
      const offset = ((distance % cycleWidth) + cycleWidth) % cycleWidth;
      rail.scrollLeft = offset;
      remainder = offset - rail.scrollLeft;
    }
    frame = window.requestAnimationFrame(advance);
  }

  function syncRepeatedCards() {
    repeatedTrack.hidden = reducedMotion.matches || track.offsetWidth <= rail.clientWidth;
  }
  syncRepeatedCards();
  reducedMotion.addEventListener("change", syncRepeatedCards, options);
  window.addEventListener("resize", syncRepeatedCards, options);
  frame = window.requestAnimationFrame(advance);
  return () => {
    controller.abort();
    window.cancelAnimationFrame(frame);
  };
}

for (const [index, category] of drinkTabs.entries()) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = category.name;
  button.addEventListener("click", () => showCategory(index));
  categories.append(button);
}
const instagramUrl = `https://www.instagram.com/${menu.instagram}/`;
document.querySelector("#social").href = instagramUrl;
openOrder.addEventListener("click", () => order.showModal());
if (drinkCategories.length) {
  document.querySelector("#empty-menu").hidden = true;
  categories.hidden = false;
  showCategory(0);
}
document.querySelector("#hours-title").hidden = !menu.hours;

for (const [selector, value] of [["#address", menu.address], ["#hours", menu.hours]]) {
  if (!value) continue;
  const element = document.querySelector(selector);
  element.textContent = value;
  element.hidden = false;
}
const heroWhatsapp = menu.whatsapp || menu.orderWhatsapp;
for (const [selector, url] of [
  ["#maps", menu.maps],
  ["#facebook", menu.facebook],
  ["#contact-phone", menu.whatsapp && `tel:+${menu.whatsapp}`],
  ["#contact-whatsapp", menu.whatsapp && `https://wa.me/${menu.whatsapp}`],
  ["#contact-instagram", menu.instagram && instagramUrl],
  ["#hero-instagram", menu.instagram && instagramUrl],
  ["#hero-whatsapp", heroWhatsapp && `https://wa.me/${heroWhatsapp}`],
  ["#hero-maps", menu.maps],
]) {
  if (!url) continue;
  const link = document.querySelector(selector);
  link.href = url;
  link.hidden = false;
}
document.querySelector("#visit").hidden = !(menu.address || menu.hours || menu.maps || menu.whatsapp);
renderOrder();

const hero = document.querySelector(".hero");
const featureButtons = hero.querySelectorAll(".hero-controls button");
const featureMenu = document.querySelector("#feature-menu");
const featured = {
  cafe: { title: "Café", description: "Un americano intenso o un latte cremoso. Pide tu favorito caliente o con hielo.", category: "Café" },
  matcha: { title: "Matcha", description: "Cremoso y suave, caliente o con hielo. Pruébalo con fresa si se te antoja algo frutal.", category: "Matcha" },
  cookie: { title: "Cookie NY", description: "Galletas gruesitas estilo New York. Escoge tu sabor favorito para acompañar el café." },
};
for (const button of featureButtons) {
  button.addEventListener("click", () => {
    const { feature } = button.dataset;
    hero.dataset.feature = feature;
    for (const option of featureButtons) option.setAttribute("aria-pressed", option === button);
    document.querySelector("#feature-title").textContent = featured[feature].title;
    document.querySelector("#feature-description").textContent = featured[feature].description;
    featureMenu.href = featured[feature].category ? "#menu" : "#pastry-title";
  });
}
featureMenu.addEventListener("click", () => {
  const { category } = featured[hero.dataset.feature];
  const index = drinkTabs.findIndex(entry => entry.name === category);
  if (index !== -1) showCategory(index);
});

if (window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
  const resetPerspective = () => {
    hero.style.setProperty("--pitch", "0deg");
    hero.style.setProperty("--yaw", "0deg");
  };
  hero.addEventListener("pointermove", event => {
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty("--pitch", `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 14}deg`);
    hero.style.setProperty("--yaw", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 18}deg`);
  });
  hero.addEventListener("pointerleave", resetPerspective);
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  for (const section of document.querySelectorAll(".reveal:not([hidden])")) observer.observe(section);
}

