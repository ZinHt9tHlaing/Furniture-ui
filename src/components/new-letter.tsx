import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Icons } from "./Icons";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";

const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Please enter a valid email address" })
    .refine((value) => value.endsWith("@gmail.com"), {
      message: "Only @gmail.com addresses are allowed",
    }),
});

export default function NewLetterForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    console.log(values);
    setLoading(true);
    form.reset();

    setTimeout(() => {
      setLoading(false);
      toast.success("Thanks for joining our newsletter!");
    }, 1000);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.error("Form validation errors:", errors);
      })}
      className="relative grid w-70 space-y-0 pr-8 lg:w-full lg:pr-0"
      // autoComplete="off"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                aria-invalid={fieldState.invalid}
                className="pr-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        size="icon"
        disabled={loading}
        className="group absolute top-7.5 right-9 z-20 size-7 cursor-pointer duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 lg:right-2"
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Icons.paperPlane
            className="size-4 duration-200 group-hover:-rotate-12"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">Join newsletter</span>
      </Button>
    </form>
  );
}
