import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
  bgImage,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  bgImage?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "row-span-1 bento-cell group/bento transition duration-300 shadow-input dark:shadow-none p-6 justify-between flex flex-col space-y-4 relative overflow-hidden",
        "bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] hover:border-white/[0.2]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Background Texture Layer */}
      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700 pointer-events-none">
          <img src={bgImage} alt="" className="h-full w-full object-cover mix-blend-soft-light grayscale contrast-125" />
        </div>
      )}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-300">
          {icon}
          <div className="font-sans font-bold text-neutral-100 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-400 text-sm">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
