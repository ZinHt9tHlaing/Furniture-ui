import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="mt-16 flex-1 md:px-0 lg:px-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
