// src/components/ui/accordion.jsx
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Accordion = ({ children, className, ...props }, ref) => {
  // ... logic for managing open state if needed
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {children}
    </div>
  );
};
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("border-b", className)} {...props}>
    {children}
  </div>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex items-center justify-between w-full p-4 font-medium text-left transition-all [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
    {/* Example icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 transition-transform duration-200"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const [isMounted, setIsMounted] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(props["data-state"] === "open" ? contentRef.current.scrollHeight : 0);
    }
  }, [props["data-state"]]);

  return (
    <div
      ref={ref}
      style={{ height: isMounted ? `${height}px` : undefined }}
      className={cn("overflow-hidden transition-[height] duration-200", className)}
      {...props}
    >
      <div ref={contentRef} className="p-4">
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };