{
  /* // This template requires the Embla Auto Scroll plugin to be installed:
// npm install embla-carousel-auto-scroll */
}

("use client");

import React, { useState, useEffect } from "react"; // Import useState and useEffect
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Updated Logo interface for theme awareness
interface Logo {
  id: string;
  description: string;
  imageLight: string; // Path for light mode
  imageDark: string; // Path for dark mode
  className?: string;
}

interface ClientLogosProps {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

// Renamed component and props interface
const ClientLogos = ({
  heading = "Trusted by these companies",
  // Updated default logos with light/dark variants where available
  logos = [
    {
      id: "logo-city",
      description: "City of Lethbridge",
      imageLight: "/images/logos/city-of-lethbridge-horizontal-dark.svg",
      imageDark: "/images/logos/city-of-lethbridge-horizontal-light.svg",
      className: "h-10 w-auto",
    },
    {
      id: "logo-uofl",
      description: "University of Lethbridge",
      imageLight: "/images/logos/uofl-horizontal-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/uofl-horizontal-light.svg",
      className: "h-10 w-auto",
    },
    {
      id: "logo-pepsico",
      description: "Pepsico",
      imageLight: "/images/logos/pepsico-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/pepsico-horizontal-light.svg",
      className: "h-10 w-auto",
    },
    {
      id: "logo-stantec",
      description: "Stantec",
      imageLight: "/images/logos/stantec-consulting-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/stantec-consulting-horizontal-light.svg",
      className: "h-10 w-auto",
    },
    {
      id: "logo-pga",
      description: "PGA",
      imageLight: "/images/logos/pga-horizontal-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/pga-horizontal-light.svg",
      className: "h-10 w-auto",
    },
    {
      id: "logo-galt",
      description: "Galt Museum",
      imageLight: "/images/logos/galt-horizontal-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/galt-horizontal-light.svg",
      className: "h-10 w-auto",
    },
    {
      id: "logo-castle",
      description: "Castle Mountain",
      imageLight: "/images/logos/castle-mountain-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/castle-mountain-logo-light.svg",
      className: "h-10 w-auto",
    },
    {
      id: "logo-storyhive",
      description: "Storyhive",
      imageLight: "/images/logos/storyhive-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/storyhive-logo-light.svg",
      className: "h-10 w-auto",
    },
  ],
}: ClientLogosProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to check and set the theme state
    const checkTheme = () => {
      // Ensure this code runs only in the browser
      if (typeof window !== "undefined") {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      }
    };

    // Initial check
    checkTheme();

    // Observe changes to the class attribute of the html element
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkTheme();
        }
      }
    });

    // Ensure observer only runs in the browser
    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, { attributes: true });
    }

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section className="py-16 md:py-24">
      <div className="container flex flex-col items-center text-center">
        {/* Adjusted heading style for consistency */}
        <h2 className="font-heading my-6 text-pretty text-3xl font-bold md:text-4xl">
          {heading}
        </h2>
        {/* Added intro line */}
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          We're proud to partner with fantastic organizations in Southern
          Alberta and beyond:
        </p>
      </div>
      <div className="pt-10 md:pt-12 lg:pt-16">
        {" "}
        {/* Adjusted padding */}
        <div className="relative mx-auto flex items-center justify-center lg:max-w-6xl">
          {" "}
          {/* Increased max-width */}
          <Carousel
            opts={{ loop: true, align: "start" }} // Added align: "start"
            plugins={[AutoScroll({ playOnInit: true, speed: 0.7 })]} // Adjusted speed
          >
            <CarouselContent className="-ml-4">
              {" "}
              {/* Adjusted margin */}
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/4 justify-center pl-4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8" // Adjusted basis
                >
                  <div className="mx-6 flex shrink-0 items-center justify-center p-2">
                    <div>
                      {/* Conditionally render image based on theme */}
                      <img
                        src={isDarkMode ? logo.imageDark : logo.imageLight}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

// Renamed export
export { ClientLogos };
