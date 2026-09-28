import type { Cart } from "@/types/cart-type";
import { Separator } from "../ui/separator";
import { formatPrice } from "@/lib/utils";
import Editable from "./Editable";

interface CartItemProps {
  cart: Cart;
}
const CartItem = ({ cart }: CartItemProps) => {
  const imageUrl = import.meta.env.VITE_IMG_URL ?? "";

  return (
    <div className="mx-4 space-y-3">
      <div className="mt-4 mb-2 flex gap-4">
        <img
          src={imageUrl + cart.image.url}
          alt={cart.image.name}
          loading="lazy"
          decoding="async"
          className="w-16 object-cover"
        />

        <div className="flex flex-col space-y-1">
          <h3 className="line-clamp-1 text-start text-sm font-medium">
            {cart.name}
          </h3>
          <span className="text-muted-foreground text-start text-xs">
            {formatPrice(cart.price)} x {cart.quantity} ={" "}
            {formatPrice((cart.price * cart.quantity).toFixed(2))}
          </span>
          <span className="text-muted-foreground line-clamp-1 text-xs capitalize">
            {`${cart.category} / ${cart.subcategory}`}
          </span>
        </div>
      </div>

     <Editable quantity={cart.quantity} />
      <Separator />
    </div>
  );
};

export default CartItem;
