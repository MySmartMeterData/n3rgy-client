import { add, differenceInCalendarDays } from "date-fns"

interface DateRange {
  start: Date
  end: Date
}

export function chunkDateRange(start: Date, end: Date, maxChunk: number = 90): DateRange[] {
  const dates: DateRange[] = []
  const duration = differenceInCalendarDays(end, start) + 1
  const chunkSize = Math.ceil(duration / Math.ceil(duration / maxChunk))

  const origStart = start
  while (start < end) {
    let currentEnd = add(start, { days: chunkSize })
    dates.push({
      start: start === origStart ? origStart : add(start, { minutes: 1 }),
      end: currentEnd <= end ? currentEnd : end
    })
    start = add(start, { days: chunkSize })
  }

  return dates
}