# Furniture — Frontend

A modern, fast, and responsive furniture e-commerce web application built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS 4**, **shadcn UI**, and **React Router v7**.

---

## Project Overview

This repository contains the client-side frontend for a furniture retail store. Engineered as a single-page application (SPA) using React 19 and Vite, it emphasizes component modularity, fluid animations, responsive layouts, and robust form validation.

### Key Highlights

- **Fast Bundling & HMR**: Powered by Vite 7 and `@vitejs/plugin-react` for instant dev-server starts and rapid Hot Module Replacement.
- **Client-Side Routing**: Configured with React Router v7, with route-level code splitting using `React.lazy()` and `Suspense`.
- **Modern Styling System**: Built on Tailwind CSS 4 with `@tailwindcss/vite`, CSS variables, dynamic dark mode, and `tw-animate-css`.
- **Component Primitives**: shadcn UI components integrated with `@base-ui/react`, Lucide icons, and Radix icons.
- **Dynamic Theming**: Light, Dark, and System theme switching with a custom `ThemeProvider` and `localStorage` persistence.
- **Form Handling & Validation**: High-performance form state management via `react-hook-form` paired with strict `zod` schema resolvers.
- **Toast Notifications**: Sleek notifications powered by `sonner` with custom styling and iconography.
- **SEO & Document Titles**: Dynamic page head management via `react-helmet-async`.

---

## Built With

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework / Runtime** | [React 19](https://react.dev/) | Core UI library |
| **Build Tool** | [Vite 7](https://vite.dev/) | Next-generation frontend tooling |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety and enhanced DX |
| **Routing** | [React Router v7](https://reactrouter.com/) | Client-side routing and layout hierarchies |
| **CSS & Design** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework with Vite integration |
| **UI Components** | [shadcn UI](https://ui.shadcn.com/) / [Base UI](https://base-ui.com/) | Accessible, customizable UI primitives |
| **Icons** | [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) | Crisp vector iconography |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) | Type-safe form validation and state |
| **Data Fetching** | [TanStack Query v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/) | Async server-state management and HTTP client |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Opinionated toast notifications |
| **Head Management** | [React Helmet Async](https://github.com/staylor/react-helmet-async) | Document head tags for SPA SEO |

---

## Project Structure

```text
Furniture-ui/
├── public/                     # Static assets (favicons, public images)
├── src/
│   ├── assets/                 # SVGs and bundled media
│   ├── components/             # Reusable UI and domain components
│   │   ├── auth/               # Login & Register forms
│   │   ├── blog/               # Blog cards and layouts
│   │   ├── cart/               # Cart item cards and quantity editor (Editable)
│   │   ├── layouts/            # RootLayout, Header, Navigation, CartSheet
│   │   ├── loading/            # Suspense fallback spinners
│   │   ├── MetaTagsHead/       # SEOHead component (react-helmet-async)
│   │   ├── products/           # ProductCard, ProductFilter, CarouselCard, Pagination
│   │   ├── theme/              # ThemeProvider & ModeToggle
│   │   ├── ui/                 # shadcn & base-ui primitives (button, sheet, card, etc.)
│   │   └── Icons.tsx           # Shared icon dictionary
│   ├── config/                 # Application configuration
│   ├── data/                   # Mock data and image assets (products, posts, carts)
│   ├── lib/                    # Helper functions (cn utility, formatPrice, etc.)
│   ├── pages/                  # Page route components
│   │   ├── auth/               # Login and Register pages
│   │   ├── blog/               # Blog index, detail, and sub-layout
│   │   ├── products/           # Product catalog, detail, and sub-layout
│   │   ├── About.tsx           # About page
│   │   ├── Error.tsx           # Error boundary page
│   │   └── Home.tsx            # Landing page
│   ├── routes/                 # Central router definitions (router.tsx)
│   ├── schema/                 # Zod validation schemas (auth, product, quantity)
│   ├── types/                  # TypeScript interface and type definitions
│   ├── App.tsx                 # Root application wrapper
│   ├── index.css               # Global CSS, Tailwind imports, CSS design tokens
│   ├── main.tsx                # Application entry point with providers
│   └── vite-env.d.ts           # Vite client type definitions
├── index.html                  # HTML template entry
├── vite.config.ts              # Vite plugins and path alias configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and scripts
```

---

## Routes Overview

| Route | Layout / Parent | Component | Description |
| :--- | :--- | :--- | :--- |
| `/` | `RootLayout` | `HomePage` | Landing page with hero section, carousel, featured products, and latest blog previews |
| `/about` | `RootLayout` | `AboutPage` | About the brand and design studio |
| `/products` | `ProductRootLayout` | `ProductPage` | Full product catalog with filter controls, search, and pagination |
| `/products/:productId` | `ProductRootLayout` | `ProductDetailPage` | Detailed view for an individual product, image galleries, and add-to-cart controls |
| `/blogs` | `BlogRootLayout` | `BlogPage` | Articles and design inspirations list (lazy loaded) |
| `/blogs/:postId` | `BlogRootLayout` | `BlogsDetailPage` | Single blog post reader with rich layout (lazy loaded) |
| `/login` | Standalone | `LoginPage` | User login form with credentials validation |
| `/register` | Standalone | `RegisterPage` | New user account registration form |
| `*` | `RootLayout` | `ErrorPage` | Catch-all error boundary and 404 handler |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20+ recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ZinHt9tHlaing/Furniture-ui
   cd Furniture-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   *or using pnpm:*
   ```bash
   pnpm install
   ```

### Environment Setup

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Define any required environment variables using the `VITE_` prefix:

```env
# .env
VITE_API_URL=http://localhost:8000/api
```

> **Note:** In Vite, only environment variables prefixed with `VITE_` are exposed to client-side code via `import.meta.env`.

### Run Locally

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:5173
```

### Build for Production

To create an optimized production build:

```bash
npm run build
```

This will run TypeScript type checks (`tsc -b`) and output the compiled static assets into the `dist/` directory.

### Preview Production Build

Preview the production build locally before deployment:

```bash
npm run preview
```

Open your browser at:

```text
http://localhost:4173
```

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with HMR at `http://localhost:5173` |
| `npm run build` | Runs TypeScript compilation and generates the production bundle in `dist/` |
| `npm run preview` | Starts a local web server to preview the production build |
| `npm run lint` | Analyzes code quality and formatting with ESLint |

---

## Backend API

For the backend REST API, authentication services, and database configuration, refer to the [backend repository](https://github.com/ZinHt9tHlaing/Furniture-Laravel).
