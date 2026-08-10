# CLT - Tienda de productos

Catálogo de productos construido con **Next.js**, **Redux Toolkit** y **TypeScript**. Consume la API pública de [DummyJSON](https://dummyjson.com) y ofrece listado con paginación, búsqueda, detalle de producto, favoritos persistentes y *pull-to-refresh (Para dispositivos móviles)*.

---

## Stack tecnológico

| Capa            | Tecnología                                       |
| --------------- | ------------------------------------------------ |
| Framework       | Next.js (App Router, Server + Client Components) |
| UI              | React 19 + Tailwind CSS v4                       |
| Estado global   | Redux Toolkit (slices + `createAsyncThunk`)      |
| Persistencia    | Redux Persist + `localStorage`                   |
| HTTP            | Axios                                            |
| Lenguaje        | TypeScript                                       |
| Lint            | ESLint (`eslint-config-next`)                    |

---

## Requisitos previos

- **Node.js ≥ 20.9** (recomendado: Node 22 LTS)
- **npm** (se instala junto con Node.js)

Verificar la versión con:

```bash
node -v
npm -v
```

---

## Puesta en marcha

```bash
# 1. Instalar todas las dependencias
npm install

# 2. Levantar el entorno de desarrollo
npm run dev
```

Luego abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

> **Nota:** la app consume la API pública de DummyJSON y las fuentes Geist desde Google Fonts por defecto, por lo que requiere conexión a internet para funcionar correctamente.

---

## Scripts disponibles

| Comando       | Descripción                                      |
| ------------- | ------------------------------------------------ |
| `npm run dev` | Levanta el servidor de desarrollo (puerto 3000)  |
| `npm run build` | Genera el build de producción                 |
| `npm start`   | Sirve el build de producción                     |
| `npm run lint`| Ejecuta ESLint sobre el proyecto                 |

---

## Estructura del proyecto

```
app/                        # Rutas de Next.js (App Router)
├── layout.tsx              # Layout raíz: Provider de Redux + Navbar + Footer
├── page.tsx                # Home: renderizamos el listado de productos
├── StoreProvider.tsx       # Creamos el store y la persistencia
├── favorites/
│   └── page.tsx            # Página de favoritos
└── products/
    └── [id]/page.tsx       # Detalle de producto

components/                 # Componentes de UI
├── ProductList.tsx         # Listado: fetch, estados, grilla, paginación
├── ProductCard.tsx         # Tarjeta individual (imagen, precio, favorito, descuento)
├── ProductSkeleton.tsx     # Esqueleton
├── Pagination.tsx          # Navegación de páginas
├── SearchInput.tsx         # Búsqueda con debounce (400 ms)
├── PullToRefresh.tsx       # Recarga táctil al hacer pull
├── Navbar.tsx / Footer.tsx # Estructura de la app
├── HeartIcon.tsx           # Ícono SVG de favorito
└── FavoritesPersistence.tsx# Persistimos los favoritos

lib/
├── api.ts                  # Cliente Axios + funciones de la API
├── store.ts                # Store, Redux Persist y transform de paginación
├── hooks.ts                # Redux hooks: useAppDispatch / useAppSelector
└── features/
    ├── products/productsSlice.ts   # Estado, thunks y reducers de productos
    └── favorites/favoritesSlice.ts # Estado de favoritos

types/
└── product.ts              # Tipos Product y ProductsResponse

assets/                     # Imágenes (logos, banner)
```



## Endpoints utilizados

| Uso               | Endpoint (DummyJSON)                      |
| ----------------- | ----------------------------------------- |
| Listado           | `GET /products?limit=&skip=`              |
| Búsqueda          | `GET /products/search?q=`                 |
| Detalle           | `GET /products/:id`                       |

El `next.config.ts` solo permite imágenes de `cdn.dummyjson.com`, el host del `thumbnail`.