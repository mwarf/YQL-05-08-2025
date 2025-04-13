"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"; // Corrected import path
import {
  Carousel,
  type CarouselApi, // Use 'type' for type-only import
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Corrected import path

// Updated interface to expect imgAttrs
interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  alt: string; // Add this line
  imgAttrs: {
    // Use the new key and define the expected shape
    src: string;
    srcset: any; // Temporarily use 'any' to bypass complex type issue
    width: number;
    height: number;
  };
}

interface FeaturedItemsCarouselProps {
  heading?: string;
  demoUrl?: string;
  items: GalleryItem[]; // Removed default value, now required
}

// Renamed component function
const FeaturedItemsCarousel = ({
  heading = "Gallery",
  demoUrl = "https://www.shadcnblocks.com", // Keep default for demoUrl if not provided
  items, // Items are now passed directly
}: FeaturedItemsCarouselProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="font-heading mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:mb-6 tracking-tight">
              {" "}
              {/* Added tracking-tight */}
              {heading}
            </h2>
            {/* Replaced Book a demo link with intro text */}
            <p className="text-sm text-muted-foreground md:text-base lg:text-lg">
              We love helping Lethbridge businesses and organizations shine.
              Here's a peek at what we've been up to:
            </p>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto rounded-lg" // Added rounded-lg
              aria-label="Previous slide" // Added aria-label
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto rounded-lg" // Added rounded-lg
              aria-label="Next slide" // Added aria-label
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* Added relative positioning and pseudo-elements for gradient masks */}
      <div className="w-full relative before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-16 before:bg-gradient-to-r before:from-background before:to-transparent before:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-16 after:bg-gradient-to-l after:from-background after:to-transparent after:pointer-events-none">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => {
              // Change to block scope
              // Return the JSX for the item
              return (
                <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                  <a
                    href={item.url}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      {/* Changed rounded-xl to rounded-lg */}
                      <div className="flex aspect-[3/2] overflow-clip rounded-lg">
                        <div className="flex-1">
                          <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                            <img
                              src={item.imgAttrs.src} // Use imgAttrs
                              srcSet={item.imgAttrs.srcset} // Use the srcset string directly
                              width={item.imgAttrs.width} // Use imgAttrs
                              height={item.imgAttrs.height} // Use imgAttrs
                              loading="lazy" // Add lazy loading
                              decoding="async" // Add async decoding
                              alt={item.alt} // Change this from item.title
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-heading mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                      {item.title}
                    </h3>
                    <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                      {item.summary}
                    </div>
                    <div className="flex items-center text-sm">
                      Read more{" "}
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                </CarouselItem>
              ); // Close the return statement
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

// Export with the new name
export { FeaturedItemsCarousel };
