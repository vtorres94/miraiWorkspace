# Prompt para crear un menú web a partir de la identidad del negocio

Copia este prompt en Claude Code o Codex y adjunta los materiales del cliente. Para un piloto con JUCO, usa la ficha de ejemplo al final y las imágenes del proyecto.

## Prompt

Diseña y construye un menú web móvil para **[nombre del negocio]**. Se abrirá al escanear un QR, desde sus redes o al recibir un enlace. Debe permitir elegir qué pedir y encontrar cómo visitar o contactar al negocio en pocos pasos.

### Materiales del negocio

- **Carta** con fotos nítidas de todas las páginas, precios, tamaños, variantes y extras.
- **Identidad** con logo preferentemente en SVG o PNG, colores si existen, letrero, empaques y fotos propias del local y de los productos. Anota cuáles se pueden usar en la web.
- **Redes** con enlaces al perfil y dos o tres publicaciones representativas. Si el contenido requiere iniciar sesión, usa las capturas facilitadas por el cliente.
- **Ubicación y contacto** con enlace de Google Maps, dirección, horarios, sucursales, teléfono y enlace de WhatsApp verificado.
- **Servicio** con opciones para consumir, recoger o pedir a domicilio, cobertura, horarios y condiciones cuando el negocio las confirme.
- **Entrega** con el objetivo principal, el repositorio si existe y el destino de publicación autorizado.

### Analiza antes de diseñar

1. Abre las fuentes disponibles. Registra qué dato procede de qué fuente y qué queda pendiente. Si hay discrepancias sobre precios, horario o contacto, conserva la evidencia y solicita el dato actualizado antes de mostrarlo como definitivo. Un teléfono público permite llamar, pero hace falta confirmación para usarlo como WhatsApp.
2. Trascribe la carta a datos editables por categoría, producto, variante y precio en MXN. Conserva los nombres de marca, las descripciones y las opciones visibles. Un campo ilegible o ausente queda pendiente. Si faltan precios, omite el total y enlaza al contacto confirmado.
3. Escribe una dirección visual de una frase y toma al menos tres decisiones observables a partir del material. Relaciona el logo con la tipografía, los empaques o ilustraciones con la composición y el lenguaje del negocio con los textos. Si faltan fotos publicables, usa el logo y una composición tipográfica propia.
4. Elige una prioridad para la primera pantalla y un detalle de marca que el usuario pueda reconocer sin leer el nombre. Revisa si la página seguiría pareciendo la de ese negocio al sustituir el logo. Si podría pertenecer a cualquier cafetería, cambia composición, imagen o tipografía antes de pasar al código.

### Construye y verifica

- Usa HTML, CSS y JavaScript estáticos salvo que el proyecto tenga otra arquitectura. Separa la carta de la presentación para que el negocio pueda actualizar productos.
- Da acceso temprano al menú, usa categorías claras y conserva cantidades y variantes al navegar. Abre WhatsApp con un resumen únicamente si se confirmó ese canal. Muestra dirección, indicaciones, horario y teléfono cuando estén verificados.
- Limita el movimiento a acciones con propósito. Por ejemplo, confirma el agregado con el contador o suaviza el cambio de categoría. Respeta `prefers-reduced-motion`, evita efectos en bucle y deja toda la información visible sin depender de la animación.
- Revisa a 360 px, 390 px y escritorio. Prueba teclado, foco, enlaces, categorías, variantes, selección vacía y agregado/eliminación. Comprueba que los recursos cargan y que cada dato crítico coincide con la fuente. Reporta por separado las comprobaciones que no pudiste ejecutar.
- Entrega la vista previa, los archivos editables, las fuentes y los datos pendientes. Publica únicamente en el destino autorizado.

## Referencias de diseño y revisión

- [Frontend Design de Anthropic](https://github.com/anthropics/skills/tree/main/skills/frontend-design) para formular y criticar una dirección visual antes de programar.
- [Skills de Emil Kowalski](https://github.com/emilkowalski/skills) para diseñar y revisar microinteracciones. En un menú estático, aplica sus principios con CSS y las APIs del navegador.
- [Web Design Guidelines de Vercel](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) para revisar accesibilidad, navegación y rendimiento.

## Ficha de ejemplo · JUCO Café

| Fuente | Datos y decisiones |
| --- | --- |
| [Carta suministrada](public/carta.jpg) | 32 opciones en 7 categorías. Los lattes pueden pedirse fríos o calientes. La carta usa verde, crema y vasos rotulados. Precios ausentes. |
| [Logo suministrado](public/juco.webp) | Sello circular negro con letras blancas, curvas gruesas y dos granos. Usarlo como firma y tomar el peso del lettering como referencia para los títulos. |
| [Instagram](https://www.instagram.com/juco.cafe/) | Villanueva, Zacatecas. Café, frappés, lattes, matcha, domicilio, tarjeta de lealtad y teléfono 499 102 9266. |
| [Google Maps](https://maps.app.goo.gl/mqc8imcdcs5B7pSD8) | C. Morelos 28, Centro, 99540 Villanueva, Zacatecas. Lunes a viernes 7:00–17:00 y 18:00–21:00. Sábado y domingo 9:00–16:00. La ficha también publica el teléfono. El horario puede variar en festivos. |

**Dirección visual.** Una carta que toma el peso tipográfico del sello de JUCO, el verde de la pieza impresa y el color del matcha, la fresa y el taro de sus vasos. Usar el encuadre de las tres bebidas como imagen principal, filas con divisores para leer rápido y un bloque visible para visitar o llamar.

**WhatsApp confirmado.** JUCO recibe pedidos en el 499 102 9266.

**Pendientes.** Precios, cobertura del servicio a domicilio y condiciones de la tarjeta de lealtad. La ficha de Maps enlaza a `juco.cafe`, que no resolvió al consultarlo. Fuentes consultadas el 20 de noviembre de 2026.
