import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Icons } from "../Icons";
import { toast } from "sonner";
import { cn } from "cn";

const quantitySchema = z.object({
  quantity: z
    .number()
    .min(0, "Quantity must be at least 0")
    .max(4, "Too Many! Is it real?"),
});

interface canBuyProps {
  canBuy: boolean;
}

export default function AddToCartForm({ canBuy }: canBuyProps) {
  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof quantitySchema>) => {
    console.log(values);
    // call api
    toast.success("Product is added to cart successfully.");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.error("Form validation errors:", errors);
      })}
      className="flex max-w-65 flex-col gap-4"
    >
      <div className="flex items-center">
        {/* Minus Button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 shrink-0 cursor-pointer rounded-r-none duration-200 active:scale-95"
        >
          <Icons.minus className="size-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>

        {/* Quantity input */}
        <Controller
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <Input
              type="number"
              inputMode="numeric" // For mobile numeric keyboard
              min={1}
              max={9999}
              {...field}
              style={{ width: "4rem" }}
              className="h-8 [appearance:textfield] rounded-none border-x-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          )}
        />

        {/* Plus Button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 shrink-0 cursor-pointer rounded-l-none duration-200 active:scale-95"
        >
          <Icons.plus className="size-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>

      <div className="flex items-center space-x-2.5">
        {/* Buy Now */}
        <Button
          type="button"
          aria-label="Buy Now"
          size={"sm"}
          className={cn(
            "bg-own dark:bg-dark-own w-[50%] py-4 font-bold duration-200 active:scale-95",
            !canBuy && "pointer-events-none bg-slate-400"
          )}
        >
          Buy Now
        </Button>
        {/* Add To Cart */}
        <Button
          type="submit"
          aria-label="Add To Cart"
          variant={canBuy ? "outline" : "default"}
          size="sm"
          className={cn(
            "w-[50%] py-4 font-semibold duration-200 active:scale-95"
          )}
        >
          {/* {cartItem ? "Update Cart" : "Add To Cart"} */}
          Add To Cart
        </Button>
      </div>
    </form>
  );
}
