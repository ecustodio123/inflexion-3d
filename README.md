# Inflexion 3D

Tienda React + Vite en `/`, integrada con `@ecustodio123/kafka-commerce@0.3.0` y `@supabase/supabase-js@2.118.0`.

## Ejecutar

```bash
node scripts/npm-with-env.mjs ci
npm run dev
```

Para compilar: `npm run build`. Para revisar el código: `npm run lint`. Para previsualizar la compilación: `npm run preview`.

## Configuración pendiente

La configuración inicial de `.env` apunta a otra tienda: sus consultas devolvieron productos como «Colcha Zorrito» y categorías de tejidos/bebés. El propietario confirmó que Inflexion 3D necesita otra tienda. Se conserva `.env`. Al revisar nuevamente la configuración se retiraron los overrides vacíos de `.env.local`, por lo que ahora se utilizan los datos completos de `.env`. La consulta sigue devolviendo 14 productos y 11 categorías del catálogo anterior; falta reemplazar el ID por el de Inflexion 3D.

Actualiza en `.env` (o mediante overrides explícitos en `.env.local`):

```dotenv
VITE_STORE_ID=
VITE_WHATSAPP_PHONE=
```

El ID debe pertenecer a la tienda real de Inflexion 3D; `inflexion3d` es solo su slug de marca. El teléfono debe ser el del negocio en formato internacional, solo dígitos. El JSON proporcionado no incluye WhatsApp. La URL y clave pública se heredan de `.env`; si Inflexion 3D utiliza otro proyecto Supabase, reemplázalas también en `.env.local`.

Para una instalación desde cero, copia `.env.example` a `.env.local` y completa todos los campos. Reinicia Vite después de cambiarlos. En producción debes recompilar. `VITE_STORE_VERIFIED` no forma parte de la API de Kafka Commerce y no se usa como prueba de identidad.

El token `GITHUB_PACKAGES_TOKEN` solo sirve para instalar desde GitHub Packages. Nunca lo prefijes con `VITE_`. Usa una clave Supabase pública publishable o anon. Los archivos `.env` y `.env.local` están excluidos de Git.

## Marca y catálogo

`src/config/store.js` centraliza la identidad y el mapeo del JSON al tema admitido por Kafka Commerce. Inter se utiliza para el cuerpo y Outfit para encabezados; se cargan con Google Fonts y tienen alternativas del sistema. Las propiedades adicionales de marca se aplican con CSS local. Kafka Commerce 0.3.0 ya formatea los precios en PEN/es-PE.

La raíz `/` muestra directamente la tienda cuando la configuración está completa. Sin ella, muestra la identidad de Inflexion 3D y el enlace real a Instagram. Los detalles técnicos pendientes aparecen solo en desarrollo.

El catálogo se obtiene de `kafka_commerce_products` y `categories` filtrando por `store_id` y `active`. Las categorías sugeridas del JSON quedan documentadas en la configuración; no se crean categorías ni productos de muestra, ni se modifican tablas o políticas RLS. Debes disponer de la tienda, los datos y sus permisos de lectura en Supabase.

La librería conserva búsqueda, filtros, categorías, favoritos, carrito persistente y checkout por WhatsApp con revalidación. El checkout prepara un mensaje; no cobra ni confirma una reserva de inventario.

## Validación

- Instalación exacta de las dependencias completada, sin vulnerabilidades reportadas por npm.
- `npm run build` y `npm run lint`: correctos.
- Vite advierte que el bundle de Kafka Commerce supera 500 kB; la compilación finaliza correctamente.
- La conexión con el `.env` actual responde: 14 productos activos y 11 categorías activas. Incluye «Colcha Zorrito» y «Leoncito», por lo que aún corresponde al catálogo anterior. Esto no valida los datos de Inflexion 3D.
- Pendiente con el ID y WhatsApp correctos: comprobar catálogo real, búsqueda, filtros, favoritos, persistencia y revalidación del checkout. No se han enviado mensajes ni realizado cambios en Supabase.
