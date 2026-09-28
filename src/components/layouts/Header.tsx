import { siteConfig } from "@/config/site";
import MainNavigation from "./navigation/MainNavigation";
import MobileNavigation from "./navigation/MobileNavigation";
import { ModeToggle } from "../theme/mode-toggle";
import AuthDropDown from "./auth/AuthDropDown";
import { User } from "@/data/user";
import CartSheet from "./cart/CartSheet";

const Header = () => {
  return (
    <header className="bg-background fixed top-0 z-50 w-full border-b md:px-0 lg:px-20">
      <nav className="container mx-auto flex h-16 items-center">
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav} />

        <div className="mr-3 flex flex-1 items-center justify-end space-x-4 md:mr-0 lg:mr-0">
          <CartSheet />
          <ModeToggle />
          <AuthDropDown user={User} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
