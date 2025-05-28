import { clsx } from "clsx";
import type { ButtonProps } from "./types";
import { button } from "./variants";

const Button = ({
  className,
  children,
  onClick,
  variant,
  size,
}: ButtonProps) => {
  const buttonClasses = clsx(button({ variant, size }), className);

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
