"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqSectionWithCategoriesProps
  extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  items: {
    question: string;
    answer: string;
    category?: string;
  }[];
  contactInfo?: {
    title: string;
    description?: string;
    buttonText: string;
    onContact?: () => void;
  };
}

const FaqSectionWithCategories = React.forwardRef<
  HTMLElement,
  FaqSectionWithCategoriesProps
>(({ className, title, description, items, contactInfo, ...props }, ref) => {
  // Default onContact handler to navigate to /contact if none provided
  const handleContactClick =
    contactInfo?.onContact ??
    (() => {
      window.location.href = "/contact";
    });

  return (
    <section
      ref={ref}
      className={cn(
        "relative pt-8 pb-16 w-full bg-muted/90 dark:bg-muted/80",
        className,
      )}
      {...props}
    >
      {" "}
      {/* Added relative, bg, reduced top padding */}
      {/* Add topography SVG background with reduced opacity */}
      <div className="absolute inset-0 -z-10 size-full bg-[url('/images/assets/topography.svg')] bg-repeat opacity-30 dark:invert" />{" "}
      {/* Fixed class to className */}
      <div className="container mx-auto px-4 relative z-10">
        {" "}
        {/* Added relative z-10 to container */}
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            {/* Apply consistent heading style */}
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>

          {/* FAQ Items */}
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "mb-4 rounded-xl",
                  "bg-card text-card-foreground",
                  "border border-border/60",
                  "shadow-sm dark:shadow-black/10",
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "px-6 py-4 text-left hover:no-underline",
                    "data-[state=open]:border-b data-[state=open]:border-border/60",
                  )}
                >
                  <div className="flex flex-col gap-2">
                    {item.category && (
                      <Badge
                        variant="secondary"
                        className="w-fit text-xs font-normal"
                      >
                        {item.category}
                      </Badge>
                    )}
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary">
                      {item.question}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-4 pb-6">
                  <p
                    className="text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact Section */}
          {contactInfo && (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">{contactInfo.title}</p>
              {contactInfo.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {contactInfo.description}
                </p>
              )}
              <Button size="sm" onClick={handleContactClick}>
                {contactInfo.buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
FaqSectionWithCategories.displayName = "FaqSectionWithCategories";

export { FaqSectionWithCategories };
