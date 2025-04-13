import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";

interface HeroProps {
  badgeText: string;
  title: string; // Example: "Your Project, Elevated: Stunning Drone Views by Coalbanks Creative."
  description: string;
  button1Text: string;
  button2Text: string;
  button1Link?: string;
  button2Link?: string;
}

const HeroWithVideoContent: React.FC<HeroProps> = ({
  badgeText,
  title,
  description,
  button1Text,
  button2Text,
  button1Link = "#",
  button2Link = "#",
}) => {
  // Split the title into heading and subheading parts
  const titleParts = title.split(":");
  const headingText = titleParts[0]?.trim() || ""; // "Your Project, Elevated"
  const subheadingText = titleParts[1]?.trim() || ""; // "Stunning Drone Views by Coalbanks Creative."

  // Function to render the heading with the gradient span
  const renderHeading = () => {
    const elevatedIndex = headingText.indexOf("Elevated");
    if (elevatedIndex === -1) {
      return headingText; // Return original text if "Elevated" not found
    }
    return (
      <>
        {headingText.substring(0, elevatedIndex)}
        <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          Elevated
        </span>
        {headingText.substring(elevatedIndex + "Elevated".length)}
      </>
    );
  };

  return (
    <div>
      {badgeText && (
        <Badge className="rounded-full py-1 border-none">
          {" "}
          {/* Removed gradient classes */}
          {badgeText}
        </Badge>
      )}
      {/* Render the heading with the gradient */}
      <h1 className="font-heading mt-6 max-w-[17ch] text-4xl font-bold !leading-[1.2] md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
        {" "}
        {/* Added tracking-tight */}
        {renderHeading()}
      </h1>
      {/* Render the new subheading */}
      {subheadingText && (
        <p className="mt-4 text-xl text-muted-foreground">{subheadingText}</p> // Added margin-top and styling
      )}
      {/* Original description */}
      <p className="mt-6 max-w-[60ch] text-lg">{description}</p>
      <div className="mt-12 flex flex-wrap items-center gap-4">
        {button1Link ? (
          <a href={button1Link}>
            <Button size="lg" className="rounded-full text-base">
              {button1Text} <ArrowUpRight className="!h-5 !w-5 ml-1" />
            </Button>
          </a>
        ) : (
          <Button size="lg" className="rounded-full text-base">
            {button1Text} <ArrowUpRight className="!h-5 !w-5 ml-1" />
          </Button>
        )}
        {button2Link ? (
          <a href={button2Link}>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="!h-5 !w-5 mr-1" /> {button2Text}
            </Button>
          </a>
        ) : (
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5 mr-1" /> {button2Text}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeroWithVideoContent;
