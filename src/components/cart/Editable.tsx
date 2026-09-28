"use client";

import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "../Icons";

import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { quantitySchema } from "@/schema/productSchema";

interface EditableProps {
  quantity: number;
}

const Editable = ({ quantity }: EditableProps) => {
  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity,
    },
  });

  const onSubmit = (values: z.infer<typeof quantitySchema>) => {
    console.log(values);
    // call api
    toast.success("Product is added to cart successfully.");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full justify-between"
    >
      <div className="flex w-32 items-center">
        {/* Minus Button */}
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          className="size-8 shrink-0 cursor-pointer rounded-l-md rounded-r-none duration-200 active:ring-1 active:ring-gray-500"
        >
          <Icons.minus className="size-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>

        {/* Quantity input */}
        <FieldGroup>
          <Controller
            name="quantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-0">
                <FieldLabel htmlFor="quantity" className="sr-only">
                  Quantity
                </FieldLabel>
                <Input
                  id="quantity"
                  type="number"
                  inputMode="numeric" // show numeric keyboard on mobile
                  min={1}
                  max={9999}
                  className="h-8 w-16 [appearance:textfield] rounded-none border-x-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Plus Button */}
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          className="size-8 shrink-0 cursor-pointer rounded-l-none rounded-r-md duration-150 active:ring-1 active:ring-gray-500"
        >
          <Icons.plus className="size-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>

      {/* delete button */}
      <div className="flex items-center space-x-2.5">
        <Button
          type="button"
          aria-label="Delete cart item"
          variant="outline"
          size="icon"
          className="size-7 cursor-pointer rounded-md border-red-300 duration-200 active:ring-1 active:ring-red-400"
        >
          <Icons.trash className="size-5 text-red-600" aria-hidden="true" />
          <span className="sr-only">Delete item</span>
        </Button>
      </div>
    </form>
  );
};

export default Editable;
