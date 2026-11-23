const menu = {
  name: "JUCO Café",
  instagram: "juco.cafe",
  whatsapp: "524991029266",
  sizes: ["Mediano", "Grande"],
  extras: [
    { name: "Shot", price: 5 },
    { name: "Cold Foam", price: 10 },
  ],
  categories: [
    { name: "Lattes especiales", photo: { x: 0, y: 0, width: 418, height: 418, alt: "Latte especial de JUCO con café y caramelo" }, prices: [55, 60], options: ["Frío", "Caliente"], milkOptions: ["Entera", "Deslactosada", "Deslactosada Light", "Almendras"], items: ["Caramelo", "Vainilla", "Avellana", "Cajeta", "Chocolate Blanco", "Mazapán", "Menta", "Chai", "Pumpkin"] },
    { name: "Frappés", photo: { x: 418, y: 0, width: 418, height: 418, alt: "Tres frappés de JUCO" }, prices: [45, 50], items: ["Mango/Chamoy", "Taro", "Matcha", "Cookies & Cream", "Café", "Choco Menta", "Moka Blanco"] },
    { name: "Sodas italianas", photo: { x: 836, y: 0, width: 418, height: 418, alt: "Cuatro sodas italianas de distintos sabores" }, prices: [40, 45], items: ["Blue Berry", "Mango", "Fresa", "Cereza", "Chicle", "Manzana"] },
    { name: "Tés y tisanas", photo: { x: 0, y: 418, width: 418, height: 418, alt: "Taza de té con hojas de hierbabuena" }, prices: [35, 40], items: ["Durazno", "Mandarina", "Hierbabuena c/ menta", "Frutos rojos", "Fresa/manzana", "Manzana Chai", "Manzanilla/Hierbabuena", "Vainilla"] },
    { name: "Expreso Tonic", photo: { x: 418, y: 418, width: 418, height: 418, alt: "Vaso de Expreso Tonic de JUCO" }, prices: [40, 45], items: ["Blue Berry", "Mango", "Cereza", "Fresa", "Chicle", "Manzana"] },
    { name: "Bebidas especiales", photo: { x: 836, y: 418, width: 418, height: 418, alt: "Bebidas especiales de matcha y taro" }, items: [
      { name: "Iced Matcha Latte", prices: [50, 55] },
      { name: "Strawberry Matcha", prices: [55, 60] },
      { name: "Iced Taro Latte", prices: [50, 55] },
    ] },
    { name: "Chocolate caliente", photo: { x: 0, y: 836, width: 418, height: 418, alt: "Taza de chocolate caliente de JUCO" }, prices: [45, 50], items: ["Chocolate caliente"] },
    { name: "Básicos", items: [
      { name: "Latte", prices: [45, 50] },
      { name: "Americano", prices: [30, 35] },
      { name: "Capuccino", prices: [40, 45] },
    ] },
    { name: "Galletas", price: 45, items: ["Red Veivet", "Chispas de chocolate", "Oreo", "Queso crema", "Triple Chocolate"] },
  ],
};
