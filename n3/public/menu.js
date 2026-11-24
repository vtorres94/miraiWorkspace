const coffeeFlavors = [
  { name: "Natural", price: 0 },
  ...["Dulce de leche", "Vainilla", "Condensada", "Caramelo", "Moka"].map(name => ({ name, price: 10 })),
];
const milkOptions = ["Entera", "Light", "Deslactosada", "Deslactosada Light"];
const milkOptionsWithOat = [...milkOptions, { name: "Avena", price: 10 }];

const menu = {
  name: "N3 Café",
  instagram: "n3cookies_cafe",
  facebook: "https://www.facebook.com/people/N3-cookies/100092989431159/",
  whatsapp: "524492905691",
  address: "Leona Vicario #4, Centro, 99540 Villanueva, Zacatecas",
  hours: "Lunes a viernes · 7:00–15:00 y 17:00–20:00\nSábado y domingo · 10:00–15:00 y 17:00–20:00",
  maps: "https://maps.app.goo.gl/kXtBYJMF8DWnQ1Mo9?g_st=ic",
  currency: "MXN",
  extras: [
    { name: "Cold foam", price: 15 },
    { name: "Shot de espresso", price: 15 },
  ],
  categories: [
    {
      name: "Café",
      layout: "drinks",
      milkOptions: milkOptionsWithOat,
      flavorOptions: coffeeFlavors,
      extras: ["Shot de espresso"],
      items: [
        { name: "Americano", price: 30, image: "fotos/americano-caliente.webp", milkOptions: [], extras: ["Shot de espresso"] },
        { name: "Capuchino", price: 40, image: "fotos/capuchino-caliente.webp" },
        { name: "Latte", price: 45, image: "fotos/latte-caliente.webp" },
        { name: "Pink Latte", price: 60, image: "fotos/pink-latte-caliente.webp", flavorOptions: [] },
      ],
    },
    {
      name: "Café frío",
      layout: "drinks",
      milkOptions: milkOptionsWithOat,
      flavorOptions: coffeeFlavors,
      extras: ["Cold foam"],
      items: [
        { name: "Americano", price: 40, image: "fotos/americano-frio.webp", milkOptions: [], extras: ["Cold foam"] },
        { name: "Latte", price: 50, image: "fotos/latte-frio.webp" },
        { name: "Pink Latte", price: 65, image: "fotos/pink-latte-frio.webp", flavorOptions: [] },
      ],
    },
    {
      name: "Frappé",
      layout: "drinks",
      milkOptions,
      price: 70,
      items: [
        { name: "Café", price: 65, image: "fotos/frappe-cafe.webp" },
        { name: "Chocolate", image: "fotos/frappe-chocolate.webp" },
        { name: "Oreo", image: "fotos/frappe-oreo.webp" },
        { name: "Mazapán", image: "fotos/frappe-mazapan.webp" },
        { name: "Crema de avellana", image: "fotos/frappe-avellana.webp" },
        { name: "Lotus", price: 80, image: "fotos/frappe-lotus.webp" },
        { name: "Taro", image: "fotos/frappe-taro.webp" },
      ],
    },
    {
      name: "Malteada",
      layout: "drinks",
      milkOptions,
      price: 65,
      items: [
        { name: "Chocolate", image: "fotos/malteada-chocolate.webp" },
        { name: "Oreo", image: "fotos/malteada-oreo.webp" },
        { name: "Vainilla", image: "fotos/malteada-vainilla.webp" },
        { name: "Fresa", image: "fotos/malteada-fresa.webp" },
      ],
    },
    {
      name: "Matcha",
      layout: "drinks",
      milkOptions: milkOptionsWithOat,
      items: [
        { name: "Matcha latte", price: 60, image: "fotos/matcha-latte-caliente.webp" },
        { name: "Matcha latte frío", price: 65, image: "fotos/matcha-latte-frio.webp", extras: ["Cold foam"] },
        { name: "Matcha de fresa frío", price: 75, image: "fotos/matcha-fresa-frio.webp", extras: ["Cold foam"] },
      ],
    },
    {
      name: "Sin café",
      layout: "drinks",
      milkOptions: milkOptionsWithOat,
      items: [
        { name: "Chai", price: 60, image: "fotos/chai-caliente.webp" },
        { name: "Dirty chai", price: 70, image: "fotos/dirty-chai-caliente.webp" },
        { name: "Chai frío", price: 65, image: "fotos/chai-frio.webp", extras: ["Cold foam"] },
        { name: "Dirty chai frío", price: 75, image: "fotos/dirty-chai-frio.webp", extras: ["Cold foam"] },
        { name: "Chocolate", price: 60, image: "fotos/chocolate-caliente.webp" },
        { name: "Chocolate frío", price: 65, image: "fotos/chocolate-frio.webp", extras: ["Cold foam"] },
      ],
    },
    {
      name: "Sándwich de helado",
      items: [{ name: "Sándwich de helado", description: "Helado de vainilla.", price: 65, image: "fotos/sandwich-helado-vainilla.webp" }],
    },
    {
      name: "Repostería",
      source: "https://www.instagram.com/n3cookies_cafe/",
      items: [
        { name: "Brownie", thumbnail: "postres/brownie.png" },
        { name: "Mostachón", thumbnail: "postres/mostachon.png" },
        { name: "Biscotti", thumbnail: "postres/biscotti.png" },
      ],
    },
    {
      name: "Galletas tipo NY",
      thumbnail: "postres/cookie-ny.png",
      source: "https://www.facebook.com/photo/?fbid=254930527616593",
      note: "Sabores de la carta de enero de 2024.",
      items: [
        "Nutella", "Ferrero", { name: "Double chocolate", thumbnail: "postres/cookie-chocolate.png" }, "Reeses & chocolate",
        "Conejo Turín", "Rocky road", { name: "Birthday cake", thumbnail: "postres/cookie-sprinkles.png" }, "Lotus",
        "Chocolate chip", "Dulce de leche & nuez", "Caramelo & nuez",
        "Almendra & arándano", "Twin", { name: "Red velvet", thumbnail: "postres/cookie-red-velvet.png" }, "Cinnamon roll",
      ],
    },
    {
      name: "Más galletas",
      thumbnail: "postres/cookie-ny.png",
      source: "https://www.facebook.com/photo/?fbid=254930527616593",
      note: "Productos de la carta de enero de 2024.",
      items: [
        { name: "Choco nuez", thumbnail: "postres/cookie-nuez.png" },
        { name: "Triple chocolate", thumbnail: "postres/cookie-chocolate.png" },
        "Zanahoria rellena",
        { name: "Cookie Beats", description: "Bolsa con 28 galletas mini", thumbnail: "postres/cookie-mini.png" },
      ],
    },
  ],
};
