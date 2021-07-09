import { subMinutes } from 'date-fns'

export function offsetTime(timestamp: string, enable: boolean = false) {
  if (!enable) return timestamp
  return subMinutes(new Date(timestamp), 30).toISOString()
}