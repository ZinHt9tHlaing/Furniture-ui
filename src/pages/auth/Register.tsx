import { Icons } from "@/components/Icons";
import { siteConfig } from "@/config/site";
import { Link } from "react-router";
import Banner from "@/data/images/house.webp";
import RegisterForm from "@/components/auth/RegisterForm";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10 md:px-12 lg:px-16">
        <div>
          <Link
            to={"#"}
            className="group text-foreground/80 hover:text-foreground inline-flex items-center text-lg font-bold tracking-tight transition-colors"
          >
            <Icons.logo
              className="mr-2 size-6 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            <span>{siteConfig.name}</span>
            <span className="sr-only">Home</span>
          </Link>
        </div>

        <div className="mt-6 flex w-full justify-center sm:mt-12 ">
          {/* register with phone */}
          <RegisterForm />
          
          {/* register with email  */}
          {/* <RegisterWithEmailForm /> */}
        </div>
      </div>

      <div className="relative hidden lg:block">
        <img
          src={Banner}
          alt="Furniture Shop"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
