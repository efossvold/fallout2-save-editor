import type { ButtonProps } from "@headlessui/react";
import { Button } from "@headlessui/react";
import { tv } from "tailwind-variants";
import { clsx } from "clsx";

const btnStyle = tv({
  base: clsx(
    "bg-gray-700 text-white font-semibold px-3 py-1.5 rounded-md cursor-pointer",
    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
    "data-hover:bg-gray-500",
    "data-disabled:bg-gray-300 data-disabled:cursor-default",
  ),
  variants: {
    color: {
      primary: "bg-gray-600",
      secondary: "bg-gray-100 text-gray-900 data-hover:bg-gray-200",
    },
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

interface IButtonProps extends ButtonProps {
  size?: keyof (typeof btnStyle)["variants"]["size"];
  color?: keyof (typeof btnStyle)["variants"]["color"];
}

export const IButton = ({ children, className, size, color, ...rest }: IButtonProps) => (
  <Button className={clsx(btnStyle({ size, color }), className)} {...rest}>
    {children}
  </Button>
);
