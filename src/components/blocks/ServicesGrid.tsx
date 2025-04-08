import React from "react";
import {
  Building2,
  Film,
  CalendarDays,
  HardHat,
  MapPinned,
  Leaf,
  type LucideIcon,
  AlertCircle, // Default/fallback icon
} from "lucide-react";

// Map icon names (strings) to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Building2,
  Film,
  CalendarDays,
  HardHat,
  MapPinned,
  Leaf,
};

// Update interface to expect iconName string
interface Service {
  iconName: string;
  title: string;
  description: string;
}

interface ServicesGridProps {
  services: Service[];
  title?: string;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services, title }) => {
  return (
    <div className="py-12 md:py-20">
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-10 sm:mb-16">
          {title}
        </h2>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-4 sm:px-6">
        {services.map((service) => {
          // Get the icon component from the map, or use a fallback
          const IconComponent = iconMap[service.iconName] || AlertCircle;
          return (
            <div
              key={service.title}
              className="flex flex-col border rounded-xl p-6 bg-card text-card-foreground hover:shadow-lg transition-shadow duration-300" // Added hover effect
            >
              <div className="mb-4 h-12 w-12 flex items-center justify-center bg-muted text-muted-foreground rounded-full">
                <IconComponent className="h-6 w-6" /> {/* Render the selected icon component */}
              </div>
              <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesGrid;
