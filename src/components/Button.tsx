import React from "react";
import { ButtonProps } from "@/interfaces/ui";

function Button({
  type,
  bgc,
  disabled,
  loading = false,
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const base = `inline-block rounded-full ${bgc} font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed`;
  const styles: any = {
    big: base + " px-12 py-3.5  text-xl",
    small: base + " px-3 py-1  text-sm",
    medium: base + " px-4 py-3 text-lg",
  };
  return (
    <button className={`${styles[type]} ${className}`} onClick={onClick}>
      {loading ? <Spinner /> : <>{children}</>}
    </button>
  );
}

export default Button;

export function Spinner({ borderColor = "border-white" }) {
  return (
    <div
      className={`animate-spin rounded-full border-solid border-t-transparent  dark:border-t-white/70 ${borderColor}  mx-auto h-5 w-5 border-2`}
    ></div>
  );
}
