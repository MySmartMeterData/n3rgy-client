import { format } from "date-fns";

export function dateToN3rgyDateString(date: Date | string): string {
  if (typeof date === 'string') date = new Date(date)
  return format(date as Date, "yyyyMMddHHmm")
}