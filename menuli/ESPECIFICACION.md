# MenúLi · Producto y plan de automatización

MenúLi permite explorar la carta, personalizar productos y preparar un pedido para enviar por WhatsApp. El negocio recibe el mensaje y confirma el pedido. JUCO Café fue el primer cliente pagado, entregado y aprobado. La propuesta es que un solo modelo de datos alimente tanto las altas asistidas por MiraiDev como el futuro editor de autoservicio.

[Flujo de IA y prompts por etapa](PROMPTS-IA.md) · [Configuración y escenarios](CONFIGURACION-Y-ESCENARIOS.md)

## De WhatsApp a cobros y terminal

| Etapa | Experiencia | Qué validar |
| --- | --- | --- |
| Lanzamiento | El cliente arma su selección y MenúLi abre un enlace `wa.me` con el mensaje preparado, como en JUCO. El negocio confirma el pedido y acuerda el cobro en el chat. | Número por sucursal, productos y variantes en el mensaje, total cuando aplique y qué verá el cliente antes de abrir WhatsApp. |
| Cobro en línea | Al activar pagos, el cliente revisa el pedido y su total en MenúLi, paga mediante una pasarela y recibe el estado de su pedido. Mercado Pago es el primer proveedor a evaluar. | Cuenta receptora, compatibilidad regional, comisiones, avisos de pago, cancelaciones, reembolsos y conciliación. |
| Kit con terminal | Oferta comercial con MenúLi, QR o NFC según el paquete y terminal para cobros presenciales. | Probar costos del equipo, cuenta receptora, instalación y soporte. Evaluar por separado si la terminal puede asociar el cobro con un pedido de MenúLi. |

Para el MVP, representar la selección con IDs de productos, variantes, extras, cantidades, sucursal, moneda y revisión de catálogo. Mantener el armado del mensaje de WhatsApp separado del cálculo y del resumen de la selección. Así la futura experiencia de pago puede reutilizar esa información sin exigir cuentas de pago, historial de pedidos ni credenciales del proveedor en el alta inicial.

Cuando se implemente el cobro, crear el pedido y calcular el importe del lado del servidor a partir de los precios autorizados. Registrar por separado el estado del pedido y el estado del pago. Un enlace de WhatsApp abierto nunca confirma que el mensaje se envió. Un regreso desde la pasarela tampoco confirma el cobro. La confirmación debe venir del proveedor y poder procesarse más de una vez sin duplicar el pedido ni marcarlo dos veces.

Los cobros en línea serán opcionales por negocio y sucursal. La cuenta receptora y los permisos de cobro quedan bajo control del negocio. La atribución a un seller se mantiene como dato comercial. Si el menú oculta precios en todo el recorrido, puede consultar por WhatsApp. Para pagar en línea, el cliente necesita ver y aceptar el importe antes de confirmar.

## Qué entregamos a JUCO

| Sección | Piloto publicado | Estándar para otros negocios |
| --- | --- | --- |
| Portada | Logo, frase, ubicación, botón al menú, imagen principal y mascota. Las fotos de categoría se deslizan y la portada sirve de respaldo. | Identidad configurable. Mascota, imágenes por categoría y animación según los materiales y el tema. |
| Menú | Nueve categorías, 48 productos, enlace a la carta original, precios fijos y precios por tamaño. Los lattes especiales admiten temperatura y leche. | Categorías ordenables, productos con precio fijo o variantes y opciones aplicables por producto o categoría. |
| Carrito | Cantidades, subtotales, total y extras por bebida. Shot cuesta $5 y Cold Foam $10. Dos bebidas iguales pueden llevar extras distintos. | Complementos con precio y reglas de aplicación por producto. |
| Pedidos | El carrito prepara el mensaje con productos, variantes, extras e importe. El visitante lo envía desde WhatsApp. | Activar pedidos cuando el negocio confirma el número. Permitir un menú informativo para quien solo quiere mostrar su carta. |
| Promos | Imagen de la tarjeta de lealtad entre menú y ubicación. | Bloque opcional con imagen, texto alternativo y vigencia. |
| Visítanos | Dirección, horario por día con turnos partidos, Maps, teléfono y WhatsApp. | Mostrar los datos disponibles, con horarios que admitan varios tramos, días cerrados y excepciones. |
| Redes y crédito | Facebook, Instagram y enlace a MiraiDev. | Redes opcionales y crédito según el plan acordado. |
| Entrega | Sitio estático en Netlify, vista previa para revisión y QR en PNG. | Vista de aprobación y URL estable para el menú, el QR y el NFC cuando corresponda. |

En JUCO empezamos con la foto de la carta. Revisamos Instagram y Maps, incorporamos el logo que compartió el usuario y tomamos de la carta los verdes y los vasos de la portada. El cliente pudo ver el piloto pronto. Después ajustó el catálogo, precios, variantes, horario y detalles visuales sobre una página que ya podía probar.

## Identidad visual automática

El formulario arranca con el nombre del negocio, la ciudad y los enlaces o archivos que tenga a mano. Logo, paleta y descripción son opcionales. Con ese material, MenúLi genera una primera vista previa editable y muestra de dónde salió cada propuesta.

| Paso | Comportamiento esperado |
| --- | --- |
| Reunir fuentes | Leer la carta, los archivos adjuntos y los enlaces públicos a la web, redes o ficha del negocio. Comprobar que nombre, ubicación o contacto vinculan cada fuente con el negocio y su sucursal. Si un perfil pide iniciar sesión o una fuente falla, continuar con las demás y permitir que el cliente adjunte una captura. |
| Elegir logo | Dar prioridad al archivo compartido para publicación. Si falta, sugerir la imagen de perfil o el logo de la web oficial o de la carta, guardando la fuente. Si hay logos distintos o ninguno es legible, mostrar el nombre del negocio en tipografía como provisional. |
| Proponer paleta | Usar primero los colores indicados por el cliente. Si faltan, extraer colores del logo o del material de marca, dar menos peso a fondos y fotos, y proponer colores para fondo, texto, botones y acento. Comprobar contraste antes de aplicar el tema. |
| Armar la vista previa | Aplicar el logo y la paleta a una plantilla. Proponer un encabezado breve y una portada basada en los materiales disponibles. Mostrar cartas, imágenes y redes cuando haya recursos suficientes. El catálogo y los datos de operación se revisan con sus propias reglas. |
| Revisar y aprobar | Mostrar al dueño el logo, la paleta y su fuente. Puede reemplazar la imagen, ajustar los colores o aceptar la propuesta en la vista previa. Guardar las correcciones como decisiones del negocio para que una nueva importación no las sobrescriba. |

Guardar junto a cada propuesta el recurso elegido, la fuente, el estado de revisión y el motivo cuando requiera intervención. Las imágenes encontradas en redes se pueden sugerir para revisión. Antes de publicarlas, confirmar que el negocio quiere usarlas y puede hacerlo. Una dirección visual más elaborada o la recreación de fotos puede quedar como ajuste del servicio asistido.

La identidad visual se comparte por negocio. Si una sucursal necesita una foto o material propio, puede reemplazarlo en su vista previa sin alterar la identidad de los otros locales. El flujo es el mismo para un alta directa o iniciada por un seller. Un seller con permiso de edición puede preparar el borrador para que el dueño lo revise.

### Paquetes discutidos

| Paquete | Propuesta | Pendiente de validar |
| --- | --- | --- |
| Sencillo | $500 MXN por menú interactivo y QR. | Costo de cuatro estampas, vigencia del alojamiento y alcance de cambios. |
| Medio | $750 MXN por lo anterior más pieza impresa con NFC y QR. | Formato, cantidades, envío y margen. |
| Pro | Desde $1,750 MXN por lo anterior más configuración de dominio propio. | Cotizar registro, alojamiento y renovación anual por separado. |

## Contrato de datos propuesto

### Clientes, sucursales y acceso

- **Negocio.** Una cuenta administra uno o varios locales. El propietario invita a su equipo y puede dar acceso a sucursales concretas. Cada sucursal puede tener dirección, horario, catálogo publicado y número de WhatsApp propios.
- **Seller.** Una cuenta comercial vende MenúLi a negocios. Puede iniciar un alta, enviar un enlace de invitación y seguir el avance de los negocios que originó. El negocio acepta la invitación y conserva la titularidad de sus sucursales, datos y publicaciones.
- **Acceso operativo del seller.** Por defecto, el seller ve el estado comercial de sus altas. Si el negocio le pide apoyo para cargar o mantener la carta, le concede un rol con permisos explícitos. El negocio puede retirar ese acceso y seguir usando sus menús.

Una misma cuenta de usuario puede pertenecer a un negocio y tener un perfil comercial. En ese caso, el panel distingue ambos espacios. La atribución de una venta al seller se guarda por separado de los permisos sobre el negocio.

| Entidad | Campos |
| --- | --- |
| Negocio | ID estable, nombre público, slug, descripción, moneda, propietario y miembros. Comparte identidad y catálogo base entre sucursales. |
| Sucursal | ID estable, negocio, nombre, slug dentro del negocio, ciudad, zona horaria, dirección, Maps, horarios y contacto operativo. Puede ajustar precios, disponibilidad, promociones y destino de pedidos sobre el catálogo base. |
| Seller y alta comercial | Seller, invitación, negocio asociado cuando acepta, estado y fechas del alta. La atribución comercial se conserva aunque termine el acceso operativo. |
| Membresía y permisos | Usuario, negocio, rol y sucursales autorizadas. La titularidad y los permisos de edición y publicación se asignan de forma explícita. |
| Identidad | Logo, portada, tema, colores, frase y mascota opcional. Cada recurso o propuesta registra fuente, estado de revisión, permiso de publicación y texto alternativo cuando corresponda. |
| Operación | Responsable privado, enlaces públicos, teléfono, WhatsApp, modalidades de pedido, ubicación, horarios y excepciones. Configuración general con ajustes por sucursal cuando corresponda. |
| Categoría | ID estable, nombre, orden, imagen opcional y grupos de opciones que se pueden heredar. |
| Producto | ID estable, categoría, nombre, descripción, visibilidad, disponibilidad, precio fijo o variantes y grupos de opciones aplicables. |
| Variante y opciones | La variante tiene nombre y precio, como Mediano. Los grupos como temperatura, leche o extras tienen opciones, valores iniciales, selección mínima y máxima y ajuste de precio cuando aplique. |
| Promos y carta original | Archivo, texto alternativo, orden, visibilidad y fechas opcionales. |
| Publicación | Negocio y sucursal cuando aplique, borrador, versión publicada, fecha, URL canónica y dominios asociados. |

1. Guardar importes en centavos enteros con moneda explícita. El total suma cantidad por precio de cada unidad, incluidos sus ajustes. Un precio desconocido queda vacío y el artículo puede mostrarse como informativo hasta que se confirme su precio.
2. Guardar la fuente de cada dato crítico y su estado de revisión. Los precios, contactos y condiciones de una carta actual confirmada por el negocio prevalecen sobre fotos antiguas y fichas públicas. La extracción propone valores y marca los dudosos para revisión.
3. Aplicar las opciones de forma explícita por producto o categoría. En JUCO, el código actual ofrece extras cuando detecta tamaños. En el formato común, un americano puede tener Shot disponible y Cold Foam desactivado si el negocio lo configura.
4. Validar slug único, enlaces, teléfono internacional, horarios y referencias entre productos y opciones. Separar el contacto privado, los archivos fuente y los borradores de los datos públicos. Los permisos se comprueban por negocio.
5. Guardar una versión aprobada independiente del borrador. Los cambios se publican juntos y la versión previa se puede restaurar. El QR y NFC usan la misma URL estable, con redirecciones si cambia el alojamiento.
6. Calcular los precios y destinos de pedido con la configuración de la sucursal que está viendo el visitante. Cada QR de mostrador apunta a su sucursal. La vista general del negocio puede permitir elegir sucursal antes de iniciar un pedido.

## Alta asistida

1. MiraiDev o el seller comparte el [formulario de alta](FORMULARIO-ALTA.md). El negocio sube su carta, registra sus sucursales y confirma qué datos cambian entre ellas. Si el alta viene de un seller, se registra su invitación.
2. La importación produce un borrador normalizado, propone logo y paleta a partir de las fuentes disponibles y señala dudas. El operador revisa la propuesta y usa el prompt de JUCO cuando se requiere diseño a medida.
3. El generador crea una vista previa móvil. El cliente revisa catálogo, precios, horarios y WhatsApp y aprueba la publicación.
4. MiraiDev prueba el recorrido, publica y entrega enlace, QR y piezas acordadas. Las correcciones futuras usan otro borrador del mismo negocio.

## Landing y autogestión

| Etapa | Qué construir | Prueba de salida |
| --- | --- | --- |
| Primeros clientes | Formulario compartible, bandeja interna y generador de menús. | Un segundo negocio pasa del formulario a una vista previa sin editar el HTML ni el JavaScript del piloto. |
| Landing y beta privada | Propuesta «Tu menú interactivo», demo de JUCO y dos entradas de registro: «Tengo un negocio» y «Quiero vender MenúLi». | Un negocio puede empezar por su cuenta o aceptar una invitación. Un seller puede invitar a un negocio y ver el estado del alta. |
| Autogestión | Panel del negocio con sucursales, catálogo base, ajustes locales, publicación y QR. Panel del seller con invitaciones y seguimiento comercial. | Un dueño publica cambios para una sucursal. Un seller puede seguir un alta sin editar los datos del negocio salvo que tenga permiso. |
| Lanzamiento público | Planes, recuperación de cuenta, soporte, seguimiento de fallos y restauración de versiones. | La beta permite medir el costo por alta y el soporte necesario antes de abrir al público. |

Para empezar, usar una plantilla compartida con temas y una ruta por negocio, como `menus.miraidev.com/juco-cafe`. Si tiene varias sucursales, cada una puede tener una ruta como `menus.miraidev.com/juco-cafe/centro`. El editor escribe borradores y la publicación genera una versión pública. Conservar JUCO como referencia hasta que el generador reproduzca su experiencia aprobada. Los dominios propios pueden tratarse como configuración comercial sin cambiar el modelo de datos.

**Pruebas de aceptación.** Reproducir JUCO con un precio fijo, un precio por tamaño y dos bebidas iguales con extras distintos. Probar dos sucursales del mismo negocio con precios y WhatsApp distintos. Comprobar que el QR abre la sucursal correspondiente. En beta, probar el alta por invitación, retirar el acceso operativo de un seller y verificar que ese cambio conserva la atribución y el menú publicado. Una publicación fallida debe conservar la versión anterior.

**Decisiones comerciales pendientes.** Definir quién cobra al negocio, cómo gana el seller, qué pasa con renovaciones y a quién corresponde el soporte. El MVP puede registrar la atribución de ventas sin automatizar cobros ni comisiones.

**Métricas.** Tiempo desde que llegan los datos hasta la vista previa, porcentaje de formularios completos, correcciones de extracción, minutos de trabajo manual y porcentaje de negocios que publican o actualizan sin ayuda.

**Primera entrega de ingeniería.** Convertir una copia de los datos de JUCO al formato común y generar la vista previa desde esos datos. Probar también el recorrido con solo una carta y enlaces, con un perfil inaccesible y con dos logos en conflicto. Comprobar que la propuesta de color sea legible y que una reimportación conserve los ajustes del dueño. Usar el mismo formulario con el siguiente cliente antes de construir el registro público.

[Código del piloto](../juco/public/index.html) · [Catálogo de JUCO](../juco/public/menu.js) · [Prompt para producción asistida](../juco/PROMPT-MENU.md)
