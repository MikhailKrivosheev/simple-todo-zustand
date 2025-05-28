export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "danger" | "absolute";
  size?: "sm" | "md" | "lg";
}
