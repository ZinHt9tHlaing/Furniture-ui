import * as React from "react";
import { Link } from "react-router";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/types";

interface ProductProps {
  products: Product[];
}

const imageUrl = import.meta.env.VITE_IMG_URL ?? "";

export function CarouselCard({ products }: ProductProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="ml-1">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 lg:basis-1/3">
            <div className="flex gap-4 p-4 lg:px-4">
              <img
                src={imageUrl + product.images[0]}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-28 rounded-md"
              />
              <div>
                <h3 className="line-clamp-1 text-base font-bold">
                  {product.name}
                </h3>
                <p className="my-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="text-own dark:text-dark-own text-sm font-semibold duration-200 hover:underline active:scale-90"
                >
                  Read more
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
