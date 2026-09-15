import RootLayout from "@/components/layouts/RootLayout";
import AboutPage from "@/pages/About";
import ErrorPage from "@/pages/Error";
import HomePage from "@/pages/Home";
import BlogPage from "@/pages/blog/Blog";
import BlogsDetailPage from "@/pages/blog/BlogDetail";
import BlogRootLayout from "@/pages/blog/BlogRootLayout";
import { createBrowserRouter } from "react-router";

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
        element: <BlogRootLayout />,
        children: [
          { index: true, element: <BlogPage /> },
          { path: ":postId", element: <BlogsDetailPage /> },
        ],
      },
    ],
  },
]);

export default router;
