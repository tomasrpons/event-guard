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


export function getNextMonthTicker(ticker: string): string {
  const months: Record<string, number> = {
    'ENE': 1,
    'FEB': 2,
    'MAR': 3,
    'ABR': 4,
    'MAY': 5,
    'JUN': 6,
    'JUL': 7,
    'AGO': 8,
    'SEP': 9,
    'OCT': 10,
    'NOV': 11,
    'DIC': 12
  };

  const [instrument, monthYear] = ticker.split('/') as [string, string];
  const month = monthYear.substring(0, 3);
  const year = parseInt(monthYear.substring(3));
  const nextMonthNum = (months[month]! % 12) + 1;
  const nextMonth = Object.keys(months).find(key => months[key] === nextMonthNum);
  const nextYear = nextMonthNum === 1 ? year + 1 : year;
  return `${instrument}/${nextMonth}${nextYear.toString().slice(-2)}`;
}
