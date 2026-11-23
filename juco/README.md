# Menú digital de JUCO Café

Primer piloto del servicio de menús web para negocios. El menú tiene 32 bebidas en siete categorías, una selección con cantidades y variantes, y un botón que prepara el pedido en WhatsApp. También muestra ubicación, horario, teléfono y redes sociales.

[Sitio público en Netlify](https://juco-cafe.netlify.app/) · [Prompt y ficha de JUCO](PROMPT-MENU.md)

## Cómo está construido

El sitio usa **HTML, CSS y JavaScript sin framework**. Netlify sirve los archivos de `public/` directamente. No hay proceso de compilación, servidor de aplicación ni base de datos. El navegador mantiene la selección en memoria hasta que se recarga o se cierra la página. El cliente revisa y envía el mensaje desde WhatsApp.

| Archivo | Función |
| --- | --- |
| [public/index.html](public/index.html) | Portada, estructura del menú, modal, ubicación, horarios y enlaces de contacto. |
| [public/style.css](public/style.css) | Diseño adaptable, colores, botones, desplazamiento y transiciones. Las animaciones respetan la preferencia de movimiento reducido. |
| [public/menu.js](public/menu.js) | Categorías, productos, variantes, usuario de Instagram y número de WhatsApp. |
| [public/app.js](public/app.js) | Renderizado de categorías y productos, selección de bebidas, cantidades y armado del mensaje. |
| [public/carta.jpg](public/carta.jpg) | Foto original que se abre directamente desde «Ver carta impresa». |
| [public/juco.webp](public/juco.webp) | Recorte del logo proporcionado para el sitio. |
| [public/bebidas-hd.webp](public/bebidas-hd.webp) | Recreación en alta resolución de las tres bebidas de portada, basada en la carta fotografiada. |
| [netlify.toml](netlify.toml) | Configuración de despliegue con `public/` como carpeta publicada. |

## Abrir en local

Desde la raíz del proyecto, ejecuta:

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory public
```

Abre [el menú local](http://127.0.0.1:8765/). Para probar desde otro dispositivo en el mismo Wi‑Fi, sustituye `127.0.0.1` por la IP Wi‑Fi de la computadora tanto en el comando como en la URL. Windows debe permitir la conexión entrante a ese puerto desde la red local. Para compartir el menú fuera de esa red, usa el enlace público.

## Actualizar el contenido

- Edita las categorías y los nombres de las bebidas en `public/menu.js`. El campo `options` define variantes de una categoría completa. Los lattes, por ejemplo, tienen «Frío» y «Caliente».
- Cambia `whatsapp` en `public/menu.js` con el número internacional y solo dígitos. Si queda vacío, se ocultan el envío del pedido por WhatsApp y el acceso al chat en Visítanos. Actualiza los enlaces `tel:` en `public/index.html` si también cambia el número de llamadas.
- Edita dirección, horarios, Maps y Facebook en `public/index.html`. Instagram toma su usuario de `public/menu.js`. Si cambia la carta impresa, actualiza el archivo de imagen y los datos del menú.
- Si un navegador conserva estilos o scripts antiguos, incrementa la versión `?v=` de ese recurso en `public/index.html` al publicar.

## Publicar cambios

Con Netlify CLI autenticada en la cuenta que gestiona JUCO, ejecuta desde la raíz:

```powershell
netlify deploy --site juco-cafe --dir public --prod
```

Usa `--site` para apuntar al sitio existente. Antes de compartir la nueva versión, abre la URL pública en un teléfono y revisa la portada, la foto de la carta, los enlaces de contacto, agregar y quitar bebidas y el resumen que se prepara en WhatsApp.

## Repetir el piloto con otro negocio

1. Reúne fotos legibles de la carta, logo, fotos que se puedan publicar, redes, ubicación, horarios y teléfono. Confirma precios y canal de pedidos con el negocio.
2. Usa el [prompt reutilizable](PROMPT-MENU.md) para extraer la carta y convertir la evidencia visual en decisiones de composición, tipografía, color y movimiento.
3. Revisa en celular el menú y sus datos antes de publicar. Comparte el enlace de Netlify con el negocio y registra correcciones y tiempo invertido.

## Pendientes de JUCO

JUCO recibe pedidos por WhatsApp en el **499 102 9266**, el número configurado en el sitio.

Queda pendiente obtener los precios vigentes. La foto de la carta no incluye precios y la selección actual muestra cantidades y variantes sin calcular un importe.
