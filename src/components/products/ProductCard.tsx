import type { Product } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "cn";
import { Link } from "react-router";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const imageUrl = import.meta.env.VITE_IMG_URL ?? "";

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div>
      <Card
        className={cn("size-full overflow-hidden rounded-lg pt-0", className)}
      >
        <Link to={`/products/${product.id}`} aria-label={product.name}>
          <CardHeader className="gap-0 border-b p-0">
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <img
                src={imageUrl + product.images[0]}
                alt="product image"
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-all duration-500 ease-in-out lg:hover:scale-105"
              />
            </AspectRatio>
          </CardHeader>
        </Link>

        <CardContent className="space-y-1.5">
          <CardTitle>{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <span className="ml-2 font-light line-through">
                {formatPrice(product.discount)}
              </span>
            )}
          </CardDescription>
        </CardContent>

        <div className="px-2 pt-1">
          {product.status === "sold" ? (
            <Button
              size={"sm"}
              className="h-8 w-full cursor-not-allowed rounded-sm py-4 font-bold"
              disabled={true}
              aria-label="Sold Out"
            >
              Sold Out
            </Button>
          ) : (
            <Button
              aria-label="Add to cart"
              size={"sm"}
              className="bg-own dark:bg-dark-own h-8 w-full cursor-pointer rounded-sm py-4 text-center font-bold duration-200 hover:bg-emerald-900 active:ring-2 active:ring-emerald-900 disabled:cursor-not-allowed dark:text-white"
            >
              <Icons.plus className="mr-1 mb-0.5 size-4" />
              Add To Cart
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
