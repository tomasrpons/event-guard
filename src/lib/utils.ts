import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function castDollarName(name: string) {
  switch (name) {
    case "tc-mayorista":
      return "Dolar Mayorista";
    default:
      return name;
  }
}
