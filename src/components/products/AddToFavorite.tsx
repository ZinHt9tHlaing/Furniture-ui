import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { useState } from "react";

interface FavoriteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  productId: string | number;
  rating?: number;
  isFavorite: boolean;
}

const AddToFavorite = ({
  productId,
  rating,
  isFavorite,
  className,
  ...props
}: FavoriteProps) => {
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      name="favorite"
      onClick={() => setFavorite((prev) => !prev)}
      className={cn("size-8 shrink-0 cursor-pointer", className)}
      {...props}
    >
      {favorite ? (
        <Icons.heartFill className="size-4 text-red-500" />
      ) : (
        <Icons.heart className="size-4 text-red-500" />
      )}
    </Button>
  );
};

export default AddToFavorite;
