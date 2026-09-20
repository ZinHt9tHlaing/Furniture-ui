"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import type { Category } from "@/types";
import { Button } from "../ui/button";

const formSchema = z.object({
  categories: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one category.",
  // }),
  types: z.array(z.string()),
  //   .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one type.",
  // }),
});

interface FilterListProps {
  filterList: {
    categories: Category[];
    types: Category[];
  };
}

function ProductFilter({ filterList }: FilterListProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      types: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Submit data", data);
  }

  return (
    <form
      id="form-rhf-checkbox"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FieldGroup className="space-y-6">
        {/* categories */}
        <Controller
          name="categories"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <FieldSet data-invalid={fieldState.invalid}>
                <div>
                  <FieldLegend variant="label">Furniture Made By</FieldLegend>
                </div>
                <FieldGroup data-slot="checkbox-group">
                  {filterList.categories.map((category) => (
                    <Field
                      key={category.id}
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                      className="flex flex-row items-start space-y-0 space-x-1"
                    >
                      <Checkbox
                        id={`form-rhf-checkbox-${category.id}`}
                        name={field.name}
                        aria-invalid={fieldState.invalid}
                        checked={field.value.includes(category.id.toString())}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, category.id]
                            : field.value.filter(
                                (value) => value !== category.id
                              );
                          field.onChange(newValue);
                        }}
                        className={"mt-0.5"}
                      />
                      <FieldLabel
                        htmlFor={`form-rhf-checkbox-${category.id}`}
                        className="text-sm font-normal"
                      >
                        {category.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </FieldSet>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        {/* types */}
        <Controller
          name="types"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <FieldSet data-invalid={fieldState.invalid}>
                <div>
                  <FieldLegend variant="label">Furniture Types</FieldLegend>
                </div>
                <FieldGroup data-slot="checkbox-group">
                  {filterList.types.map((type) => (
                    <Field
                      key={type.id}
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                      className="flex flex-row items-start space-y-0 space-x-1"
                    >
                      <Checkbox
                        id={`form-rhf-checkbox-${type.id}`}
                        name={field.name}
                        aria-invalid={fieldState.invalid}
                        checked={field.value.includes(type.id.toString())}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, type.id]
                            : field.value.filter((value) => value !== type.id);
                          field.onChange(newValue);
                        }}
                        className={"mt-0.5"}
                      />
                      <FieldLabel
                        htmlFor={`form-rhf-checkbox-${type.id}`}
                        className="text-sm font-normal"
                      >
                        {type.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </FieldSet>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />
      </FieldGroup>

      {/* button */}
      <div className="flex items-center gap-2">
        <Button
          type="submit"
          variant={"outline"}
          className="cursor-pointer duration-200 active:ring-1 active:ring-gray-300"
        >
          Filter
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          className="cursor-pointer duration-200 active:ring-1 active:ring-red-400"
          onClick={() => {
            form.reset({ categories: [], types: [] });
            // clearFilter();
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}

export default ProductFilter;
