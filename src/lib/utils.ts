import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (number: number) =>
  number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .replace(".", ",");
