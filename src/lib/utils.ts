export { cn } from "cn";

export function formatPrice(
  price: number | string,
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options.currency ?? "USD",
    notation: options.notation ?? "compact",
  }).format(Number(price));
}
