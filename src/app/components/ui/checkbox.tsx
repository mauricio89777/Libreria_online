"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad para combinar clases

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClass?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, containerClass, ...props }, ref) => {
    return (
      <div className={cn("flex items-center space-x-2", containerClass)}>
        <input
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
