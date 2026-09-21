import { Link, type LinkProps } from "react-router";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { cn } from "cn";

interface BackButtonProps
  extends
    Omit<LinkProps, "to">,
    Pick<React.ComponentProps<typeof Button>, "variant" | "size"> {
  href: string;
  label: string;
}

const BackButton = ({
  href,
  label,
  variant,
  size,
  className,
}: BackButtonProps) => {
  return (
    <Button
      variant={variant || "outline"}
      size={size}
      className={cn(
        "group mt-8 mb-6 border border-gray-300 duration-200 active:ring-1 active:ring-gray-400",
        className
      )}
    >
      <Link to={href} className="inline-flex items-center gap-2">
        <Icons.arrowLeft className="h-4 w-4 duration-200 group-hover:-translate-x-1" />
        <span>{label}</span>
      </Link>
    </Button>
  );
};

export default BackButton;
