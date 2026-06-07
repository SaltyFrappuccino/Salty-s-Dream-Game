import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", disabled, ...props }: Props) {
  return (
    <button
      className={clsx(styles.root, variant === "secondary" && styles.variantSecondary, disabled && styles.disabled, className)}
      disabled={disabled}
      {...props}
    />
  );
}
