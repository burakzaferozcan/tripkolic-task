import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", icon, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div className="relative flex items-center">
          {icon && <div className="absolute left-3 text-gray-500">{icon}</div>}
          <input
            ref={ref}
            className={`w-full p-3 ${
              icon ? "pl-10" : "pl-3"
            } rounded bg-white border border-gray-300 focus:outline-none focus:border-blue-500 ${
              error ? "border-red-500" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
