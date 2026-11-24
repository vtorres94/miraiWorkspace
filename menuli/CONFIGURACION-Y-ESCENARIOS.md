# MenúLi · Configuración y escenarios

JUCO es un caso de prueba. Otro negocio puede llegar con su catálogo listo y querer publicarlo en una sola revisión. Otro puede empezar con una foto sin precios y activar pedidos más adelante. Para simplificar ambos recorridos, MenúLi separa lo que el negocio **sabe**, lo que quiere **mostrar** y las funciones que quiere **activar**.

## Datos, preferencias y publicación

- **Datos del negocio.** Conservar catálogo, precios, fotos y contacto con su estado de revisión. Una preferencia de visibilidad nunca borra el dato original.
- **Preferencias.** Guardar elecciones explícitas del dueño aparte del catálogo. Si vuelve a importar una carta con precios, el importador actualiza los valores del borrador y conserva su preferencia de ocultarlos.
- **Versión pública.** La app genera únicamente los campos autorizados por la configuración y la revisión aprobada. Si el precio está oculto en todo el recorrido, queda fuera del HTML, los datos públicos, el carrito y el texto generado para WhatsApp.
- **Herencia.** Cada sucursal usa los datos y ajustes del negocio salvo que tenga uno propio. «Heredar», «activar» y «desactivar» son estados distintos. Antes de publicar, mostrar si el cambio aplica a una sucursal o a todo el negocio.

## Variables y valores iniciales

| Área | Opciones | Comportamiento inicial |
| --- | --- | --- |
| Precios | Mostrar confirmados en carta, mostrar solo al confirmar, ocultar en todo el recorrido | Mostrar en carta cuando la fuente está confirmada. Mantener pendientes como datos internos hasta revisión. |
| Pedidos | Solo ver menú, consultar por WhatsApp, pedir por WhatsApp con total | Arrancar como menú informativo hasta que el negocio habilite pedidos y confirme el número. La consulta puede enviar una selección sin importes. |
| Catálogo | Disponible, agotado, oculto. Precio fijo, variantes, precio pendiente | Mostrar productos disponibles de la carta vigente. Los pendientes pueden leerse, pero una opción sin precio confirmado no entra en un pedido con total. |
| Personalización | Variantes y extras habilitados por producto o categoría | Mostrar solo opciones aplicables. Un extra no depende de que el producto tenga tamaños. Si no se conocen recargos o reglas, marcarlos para esa revisión. |
| Identidad | Tema sugerido, logo y colores propios, imágenes opcionales | Usar los materiales autorizados y proponer un tema. Usar el nombre como respaldo si falta logo. Conservar ajustes del dueño en reimportaciones. |
| Secciones | Carta original, promos, ubicación, horarios, redes y fotos, cada una automática, visible u oculta | En automático, aparecen cuando tienen contenido publicable. Si se pide mostrar una sección vacía, señalar el dato que hace falta en esa sección. |
| Entrega y contacto | Sin pedidos, recogida, domicilio o ambos. Contacto general opcional | Pedir modalidades, costos o condiciones solo cuando el negocio los quiera ofrecer. Confirmar el destino de WhatsApp por sucursal. |
| Sucursales | Un local, varios locales con catálogo común o ajustes por local | Empezar con el alcance disponible. Preguntar por diferencias entre locales cuando se agrega otra sucursal o se publica su menú. |

## Combinaciones de precios y pedidos

| Caso | Resultado público |
| --- | --- |
| Al iniciar ya hay carta completa, precios y WhatsApp confirmado | Importar el catálogo, conservar los precios y proponer una vista previa. Habilitar el modo de pedido elegido sin pedir esos mismos datos otra vez. |
| Mostrar precios y aceptar pedidos | Carta con importes confirmados. El carrito muestra subtotales y total antes de abrir WhatsApp. |
| Ocultar precios solo en el listado | La carta omite importes. Si hay pedidos con total, el carrito sí los muestra antes de enviar. El editor deja claro ese alcance. |
| Ocultar precios en todo el sitio después de publicar | Conservar importes en el editor y retirarlos de la nueva versión pública. Si hay carrito con total, ofrecer pasar a consulta sin importes o a solo mostrar el menú. Pedir una sola decisión para resolver el conflicto. |
| Carta sin precios o con algunos pendientes | Permitir vista previa y menú informativo. Si acepta consultas, se puede enviar una selección sin importes. En el modo con total solo entran productos cuyas variantes y extras tengan importes confirmados. |
| El negocio solo quiere un menú | Mostrar u ocultar los precios según su preferencia. Puede conservar un enlace de contacto general aunque el carrito esté desactivado. |
| El negocio vuelve a mostrar los precios | Recuperar los importes previamente guardados y revisar los que sigan pendientes. No hace falta reimportar la carta. |

## Registro corto y preguntas en contexto

1. **Crear el borrador.** Pedir nombre y ciudad del negocio. El responsable viene de la sesión y la atribución al seller viene de la invitación autenticada.
2. **Traer la carta.** En una pantalla se puede subir un archivo, pegar un enlace o capturar productos directamente. Redes, logo y fotos se ofrecen como datos opcionales en esa pantalla o en la vista previa.
3. **Mostrar primero.** Importar directamente los datos estructurados y usar IA para lo que falta extraer o proponer. Un catálogo completo puede llegar a revisión sin más preguntas. Con información parcial, mostrar la vista previa con los pendientes agrupados por sección.
4. **Preguntar según la acción.** Si alguien activa pedidos, pedir el número confirmado y las condiciones aplicables. Los tamaños y extras se editan desde el producto. Las diferencias de precios y horarios aparecen al editar otra sucursal. Mantener los ajustes menos frecuentes dentro del editor.
5. **Revisar y publicar.** Resumir qué se mostrará y cómo se pide. La app comprueba permisos y guarda la versión aprobada. Si falla la publicación, el menú anterior sigue funcionando.

## Validación

| Prueba | Criterio de aceptación |
| --- | --- |
| Carta completa y dato confirmado en el formulario | El flujo no repite la pregunta y puede generar una vista previa en el mismo recorrido. |
| Carta parcial, ilegible o con fuente inaccesible | Aprovecha lo disponible. Pide únicamente la página o campo necesario para el modo elegido. |
| Mostrar, ocultar, reimportar y reactivar precios | No aparecen importes en los recursos públicos cuando se ocultan. Se recuperan los mismos precios autorizados al reactivar y la reimportación no altera preferencias. |
| Desactivar extras o marcar agotado | La publicación impide seleccionar la opción desactivada. Se conservan los datos del catálogo para reactivarlos. |
| Dos sucursales con WhatsApp, precios y visibilidad distintos | Cada QR, carta y pedido usa la configuración de su sucursal. |
| Sin logo, promo, ubicación o redes | La vista sigue siendo usable con secciones opcionales apagadas y una portada de respaldo. |
| Seller sin permiso de publicar | Puede iniciar y seguir el alta. Un negocio autorizado aprueba la publicación. |
| Edición manual durante una importación o fallo de IA | La app detecta revisiones concurrentes y protege cambios aprobados. El operador puede reintentar sin duplicar productos. |

Probar todas las combinaciones de visibilidad de precios, modalidad de pedido y estado de precios. Cubrir las transiciones en ambos sentidos y los casos de roles y sucursales. Para ajustes que operan de forma independiente, como redes, colores y fotos, probar combinaciones por pares y una configuración mínima con todo lo opcional apagado.

**Probabilidades.** Hasta tener más altas, usar escenarios, sin asignarles porcentajes. Medir cuántos llegan con carta completa, parcial o sin precios, cuántos muestran u ocultan importes, qué modos de pedido eligen y cuántas preguntas necesitaron antes de ver el borrador. Esos datos servirán para mejorar los valores iniciales y reducir fricción.

[Especificación](ESPECIFICACION.md) · [Flujo de IA y prompts](PROMPTS-IA.md)
