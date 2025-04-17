{
  /* // This template requires the Embla Auto Scroll plugin to be installed:
// npm install embla-carousel-auto-scroll */
}

("use client");

import React, { useState, useEffect, useRef, useCallback } from "react"; // Import useRef and useCallback
import AutoScroll from "embla-carousel-auto-scroll";
// Import CarouselApi type from shadcn/ui component
import { type CarouselApi } from "@/components/ui/carousel";
// Removed PauseIcon, PlayIcon, Button imports

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
  heading = "Clients We've Served",
  // Updated default logos with light/dark variants where available
  logos = [
    {
      id: "logo-city",
      description: "City of Lethbridge",
      imageLight: "/images/logos/city-of-lethbridge-horizontal-dark.svg",
      imageDark: "/images/logos/city-of-lethbridge-horizontal-light.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-uofl",
      description: "University of Lethbridge",
      imageLight: "/images/logos/uofl-horizontal-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/uofl-horizontal-light.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-pepsico",
      description: "Pepsico",
      imageLight: "/images/logos/pepsico-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/pepsico-horizontal-light.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-stantec",
      description: "Stantec",
      imageLight: "/images/logos/stantec-consulting-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/stantec-consulting-horizontal-light.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-pga",
      description: "PGA",
      imageLight: "/images/logos/pga-horizontal-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/pga-horizontal-light.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-galt",
      description: "Galt Museum",
      imageLight: "/images/logos/galt-horizontal-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/galt-horizontal-light.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-castle",
      description: "Castle Mountain",
      imageLight: "/images/logos/castle-mountain-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/castle-mountain-logo-light.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-storyhive",
      description: "Storyhive",
      imageLight: "/images/logos/storyhive-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/storyhive-logo-light.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-smrid",
      description: "SMRID",
      imageLight: "/images/logos/smrid-logo-dark.svg", // Using dark mode one for light bg
      imageDark: "/images/logos/smrid-logo-light.svg",
      className: "h-12 w-auto",
    },
  ],
}: ClientLogosProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Removed isPlaying state
  const [api, setApi] = useState<CarouselApi>() // State to hold the API instance
  const autoScroll = useRef(
    // Keep stopOnInteraction: false so hover/focus works independently
    AutoScroll({ playOnInit: true, speed: 0.7, stopOnInteraction: false })
  ); // Create plugin instance in ref

  // Get the playing state once the API and plugin are ready
  useEffect(() => {
    if (!api || !autoScroll.current) {
      return; // Add missing semicolon
    }
    // No need to set isPlaying state here anymore
    // setIsPlaying(autoScroll.current.isPlaying());

  }, [api]); // Depend only on api readiness


  // Removed togglePlay callback

  // Pause on hover/focus, resume on blur/leave
   const pauseOnInteract = useCallback(() => {
    autoScroll.current?.stop();
  }, []); // No dependencies needed

  const resumeOnLeave = useCallback(() => {
    // Resume if plugin exists and isn't already playing (due to hover/focus pause)
    if (autoScroll.current && !autoScroll.current.isPlaying()) {
       autoScroll.current.play();
    }
  }, []); // No dependency on isPlaying needed

  // Theme detection effect
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
        <h2 className="font-heading my-6 text-pretty text-3xl font-bold md:text-4xl tracking-tight">
          {" "}
          {/* Added tracking-tight */}
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
        {/* Add event listeners for hover/focus */}
        <div
          onMouseEnter={pauseOnInteract}
          onMouseLeave={resumeOnLeave}
          onFocus={pauseOnInteract} // Added for keyboard focus
          onBlur={resumeOnLeave}    // Added for keyboard focus
          className="relative" // Needed for positioning the button
        >
          <Carousel
            opts={{ loop: true, align: "start" }} // Added align: "start"
            // Pass the plugin instance via the plugins prop
            plugins={[autoScroll.current]}
            // Use setApi prop to get the Embla instance for control
            setApi={setApi}
          >
            <CarouselContent className="-ml-4">
              {" "}
              {/* Adjusted margin */}
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/4 justify-center pl-4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8" // Adjusted basis
                >
                  {/* Give this div a fixed width and center content */}
                  <div className="mx-auto flex h-20 w-24 md:w-32 shrink-0 items-center justify-center p-2">
                    {" "}
                    {/* Changed h-16 to h-20 */}
                    <div>
                      {/* Conditionally render image based on theme */}
                      <img
                        src={isDarkMode ? logo.imageDark : logo.imageLight}
                        alt={logo.description}
                        // Keep original height constraint, maybe add max-w-full
                        className={`${logo.className} max-w-full`}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Gradient Overlays - Moved inside Carousel */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"></div>
            {/* Gradient Overlays - Moved inside Carousel */}
            {/* Gradient Overlays - Moved inside Carousel */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"></div>
          </Carousel>
          {/* Removed Pause/Play Button */}
        </div> {/* Closing the div that has hover/focus listeners */}
        </div> {/* Closing the div with class="relative mx-auto..." */}
      </div>
    </section>
  );
};

// Renamed export
export { ClientLogos };
