import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { cartItems } from "@/data/carts";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "@/components/cart/CartItem";
import { formatPrice } from "@/lib/utils";

const CartSheet = () => {
  const itemCount = 4;
  const amountTotal = 10;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            size={"icon"}
            variant="outline"
            className={cn("relative cursor-pointer")}
            aria-label="Open cart"
          >
            <Badge className="absolute -top-2 -right-2 size-2 justify-center rounded-full bg-red-500 p-2 text-white dark:bg-red-600">
              {itemCount}
            </Badge>
            <Icons.cart className="size-4" aria-hidden="true" />
            <span className="sr-only">Cart</span>
          </Button>
        }
      />
      <SheetContent
        className="w-full text-center text-2xl md:max-w-lg"
        aria-describedby={undefined}
      >
        <SheetHeader>
          <SheetTitle className={"text-xl"}>
            {itemCount > 0 ? `Cart - ${itemCount}` : "Empty cart"}
          </SheetTitle>
        </SheetHeader>

        <Separator />

        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="h-[68vh] pb-8">
              <div className="flex-1">
                {cartItems.map((cart) => (
                  <CartItem key={cart.id} cart={cart} />
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4">
              <Separator />

              <div className="mx-4 space-y-1.5 text-base">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatPrice(amountTotal.toFixed(2))}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetClose
                  render={
                    <Button
                      type="submit"
                      className="w-full py-5 duration-150 active:ring-1 active:ring-gray-500"
                    >
                      <Link to="/checkout" aria-label="Check out">
                        Continue to checkout
                      </Link>
                    </Button>
                  }
                />
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart className="text-muted-foreground mb-4 size-16" />
            <h3 className="text-muted-foreground text-xl font-medium">
              Your cart is empty
            </h3>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
