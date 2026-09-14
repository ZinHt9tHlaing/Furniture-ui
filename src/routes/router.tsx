import ContactPage from "@/pages/Contact";
import HomePage from "@/pages/Home";
import RootLayout from "@/pages/layouts/RootLayout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

export default router;
