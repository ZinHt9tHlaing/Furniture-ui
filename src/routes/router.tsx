import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";
import AboutPage from "@/pages/About";
import ErrorPage from "@/pages/Error";
import HomePage from "@/pages/Home";
// import BlogPage from "@/pages/blog/Blog";
// import BlogsDetailPage from "@/pages/blog/BlogDetail";
// import BlogRootLayout from "@/pages/blog/BlogRootLayout";

// Blogs lazy loading
const BlogRootLayout = lazy(() => import("@/pages/blog/BlogRootLayout"));
const BlogPage = lazy(() => import("@/pages/blog/Blog"));
const BlogsDetailPage = lazy(() => import("@/pages/blog/BlogDetail"));

// Products
import ProductPage from "@/pages/products/Product";
import ProductDetailPage from "@/pages/products/ProductDetail";
import ProductRootLayout from "@/pages/products/ProductRootLayout";
import SuspenseFallback from "@/components/loading/SuspenseFallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <BlogRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<SuspenseFallback />}>
                <BlogPage />
              </Suspense>
            ),
          },
          {
            path: ":postId",
            element: (
              <Suspense fallback={<SuspenseFallback />}>
                <BlogsDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "products",
        element: <ProductRootLayout />,
        children: [
          { index: true, element: <ProductPage /> },
          { path: ":productId", element: <ProductDetailPage /> },
        ],
      },
    ],
  },
]);

export default router;
