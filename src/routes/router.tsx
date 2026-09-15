import RootLayout from "@/components/layouts/RootLayout";
import ContactPage from "@/pages/Contact";
import ErrorPage from "@/pages/Error";
import HomePage from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export default router;
