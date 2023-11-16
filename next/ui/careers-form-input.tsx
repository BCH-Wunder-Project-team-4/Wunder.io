import React from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={clsx(
          "flex w-full items-center rounded border-2 border-primary-600 bg-white px-2 py-1.5 text-md text-steelgray",
          "placeholder:text-primary-600",
          "focus:border-primary-600 active:enabled:border-primary-600",
          "disabled:cursor-not-allowed disabled:border-finnishwinter disabled:bg-finnishwinter disabled:text-finnishwinter",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
