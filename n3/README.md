# N3 Café · MenúLi

Vista previa basada en el piloto de JUCO. La interfaz móvil toma como referencia [Spill](https://dribbble.com/shots/27677745-Coffee-App-UI-UX-Mobile-Coffee-Ordering-Cafe-App-Design), con un carrusel de especiales, categorías desplazables y fichas de producto. Las imágenes proceden del [archivo de Instagram](material-instagram/descripciones.json). Las animaciones respetan la preferencia de movimiento reducido.

La [bio de Instagram](https://www.instagram.com/n3cookies_cafe/) menciona café, matcha, malteada, frappé, brownies, mostachón y biscotti. Las publicaciones de [noviembre](https://www.instagram.com/n3cookies_cafe/p/Df7mKqLB62B/) y [octubre de 2026](https://www.instagram.com/n3cookies_cafe/p/DePNmWahImj/) muestran seis bebidas de temporada y sus preparaciones. La [carta de galletas de enero de 2024](https://www.facebook.com/photo/?fbid=254930527616593) aporta 19 productos para revisar con N3.

Los precios y la disponibilidad se confirman con el negocio. La dirección proporcionada es Leona Vicario #4, Centro, Villanueva, Zacatecas. El enlace de Maps busca esa dirección. El horario mostrado proviene de [Facebook](https://www.facebook.com/people/N3-cookies/100092989431159/).

Abre `public/index.html` en un navegador o ejecuta desde esta carpeta:

```powershell
python -m http.server 8766 --bind 127.0.0.1 --directory public
```

## Cargar la carta

Edita `public/menu.js` con los datos confirmados. Cada categoría tiene `name` e `items`. Un producto puede tener `name` y `price`, o `prices` en el mismo orden que `sizes`. Los importes se expresan en unidades de la moneda configurada. Los productos sin precio se muestran como informativos.

Las categorías pueden declarar `options` para temperatura y `milkOptions` para tipos de leche. Para habilitar extras, registra sus nombres y precios en `menu.extras` y enumera los nombres aplicables en `extras` del producto o de la categoría. Un arreglo vacío en un producto desactiva los extras heredados.

Configura `whatsapp` con el número internacional, solo dígitos, para activar la selección y el enlace de pedido en productos con precio. `address`, `hours` y `maps` son opcionales. Cada categoría puede indicar una fuente en `source` y una nota en `note`. Revisa en móvil el catálogo y un pedido de prueba antes de generar el QR con la URL definitiva.
