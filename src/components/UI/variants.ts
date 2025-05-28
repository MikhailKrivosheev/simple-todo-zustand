import { tv } from "tailwind-variants";

export const button = tv({
  base: "inline-flex items-center justify-center rounded transition cursor-pointer",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      danger: "bg-red-500 text-white hover:bg-red-600",
      absolute: "absolute top-0 left-0 h-full w-full",
    },
    size: {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
