import { Badge } from "@/components/ui/badge"; // Adjusted path
import { Button } from "@/components/ui/button"; // Adjusted path
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";

interface HeroProps {
  badgeText: string;
  title: string;
  description: string;
  button1Text: string;
  button2Text: string;
  button1Link?: string; // Optional link for button 1
  button2Link?: string; // Optional link for button 2
}

const HeroWithVideoContent: React.FC<HeroProps> = ({
  badgeText,
  title,
  description,
  button1Text,
  button2Text,
  button1Link = "#", // Default link if not provided
  button2Link = "#", // Default link if not provided
}) => {
  return (
    <div>
      {badgeText && (
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
          {badgeText}
        </Badge>
      )}
      <h1 className="font-heading mt-6 max-w-[17ch] text-4xl font-bold !leading-[1.2] md:text-5xl lg:text-[2.75rem] xl:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg">{description}</p>
      <div className="mt-12 flex flex-wrap items-center gap-4">
        {/* Use anchor tags if links are provided */}
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
