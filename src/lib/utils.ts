import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function castDollarName(name: string) {
  switch (name) {
    case "tc-mayorista":
      return "Dolar Mayorista";
    case "I.CCL":
      return "CCL"
    case "I.RFX20":
      return "RFX20"
    default:
      return name;
  }
}



export function convertToDate(dateString: string) {
  const year = +dateString.slice(0, 4);
  const month = +dateString.slice(4, 6) - 1;
  const day = +dateString.slice(6, 8);
  return new Date(year, month, day);
}
