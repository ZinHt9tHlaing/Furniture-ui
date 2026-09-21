import { useRef } from "react";
import BackButton from "@/components/BackButton";
import SEOHead from "@/components/MetaTagsHead/SEOHead";
import ProductCard from "@/components/products/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { products } from "@/data/products";
import type { Product } from "@/types";
import { useParams } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";
import { formatPrice } from "@/lib/utils";
import RatingConverter from "@/components/products/RatingConverter";
import AddToFavorite from "@/components/products/AddToFavorite";
import AddToCartForm from "@/components/products/AddToCartForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const imageUrl = import.meta.env.VITE_IMG_URL ?? "";

  return (
    <div>
      <SEOHead title={`Product Detail - ${productId}`} />
      <div className="container mx-auto px-4 md:px-0">
        <BackButton href="/products" label="All Products" />

        <section className="my-6 flex flex-col gap-8 md:flex-row md:gap-6 lg:gap-16">
          <Carousel plugins={[plugin.current]} className="w-full md:w-1/2">
            <CarouselContent>
              {product?.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img
                      src={imageUrl + img}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="size-full rounded-md object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Separator className="mt-4 md:hidden" />

          {/* Product details */}
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <div className="space-y-2">
              <h2 className="line-clamp-1 text-2xl font-bold">
                {product?.name}
              </h2>
              <p className="text-base">{formatPrice(Number(product?.price))}</p>
            </div>

            <Separator className="my-1.5" />
            <p className="text-muted-foreground text-base">
              <span className="text-foreground">{product?.inventory}</span> in
              stock
            </p>

            <div className="flex items-center justify-between">
              <RatingConverter ratingCount={Number(product?.rating)} />
              <AddToFavorite
                productId={String(product?.id)}
                rating={Number(product?.rating)}
                isFavorite={true}
              />
            </div>

            <Separator className="my-5" />

            {/* Add to cart */}
            <AddToCartForm
              canBuy={product?.status === "active" ? true : false}
            />

            <Separator className="mt-4 md:hidden" />

            <Accordion defaultValue={["item-1"]} className={"w-full"}>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  {product?.description ??
                    "No description is available for this product."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* More products */}
        <section className="space-y-6 overflow-hidden">
          <h2 className="line-clamp-1 text-3xl font-bold">
            More products from Furniture Shop
          </h2>

          <ScrollArea className="pb-8">
            <div className="flex gap-4">
              {products
                .filter((item) => item.id !== productId)
                .slice(0, 4)
                .map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className="min-w-65"
                  />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
