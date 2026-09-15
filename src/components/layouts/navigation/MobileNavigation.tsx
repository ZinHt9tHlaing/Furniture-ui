import { Link } from "react-router";
import type { MainNavItem } from "@/types";
import { Icons } from "@/components/Icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

interface MobileNavigationProps {
  items?: MainNavItem[];
}

const MobileNavigation = ({ items }: MobileNavigationProps) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const mediaQuery = "(min-width: 1024px)";

  // check if screen width is 1024px or more
  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setIsDesktop(event.matches); // true if screen width is 1024px or more
    }

    const result = matchMedia(mediaQuery); // true if screen width is 1024px or more

    result.addEventListener("change", onChange);

    // cleanup (this function is called when the component unmounts)
    return () => {
      result.removeEventListener("change", onChange);
    };
  }, [mediaQuery]);

  if (isDesktop) {
    return null;
  }

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size={"icon"}
              className="ml-4 size-5 cursor-pointer duration-200 active:scale-95"
            >
              <Icons.menu aria-hidden="true" />
              {/* sr => screen reader */}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          }
        />
        <SheetContent side="left" className="w-[70%] pt-9 pl-7">
          <SheetClose>
            <Link to={"/"} className="flex items-center">
              <Icons.logo className="mr-2 size-5" aria-hidden="true" />
              <span className="text-lg font-bold">{siteConfig.name}</span>
              {/* sr => screen reader */}
              <span className="sr-only">Home</span>
            </Link>
          </SheetClose>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8">
            <Accordion multiple className="w-[80%] border-b-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-md">
                  {items?.[0].title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col items-start space-y-2 pl-2">
                    {items?.[0].card?.map((item, index) => (
                      <SheetClose key={index}>
                        <Link
                          to={String(item.href)}
                          className="text-foreground/70 w-full text-left no-underline"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-4 flex flex-col items-start space-y-2">
              {items?.[0].menu?.map((item, index) => (
                <SheetClose key={index}>
                  <Link to={String(item.href)} className="font-semibold">
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
