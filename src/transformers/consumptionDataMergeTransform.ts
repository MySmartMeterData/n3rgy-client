import { N3rgyConfigurationOptions, N3rgyConsumption, N3rgyConsumptionValue } from "../types"
import { offsetTime, n3rgyDateToISODate } from "../utils"

export function consumptionDataMergeTransform(rawData: N3rgyConsumption[], options?: N3rgyConfigurationOptions): N3rgyConsumption {
  const values = rawData.flatMap((data: N3rgyConsumption) => {
    return data.values.map((v: N3rgyConsumptionValue) => {
      return {
        value: v.value,
        timestamp: offsetTime(n3rgyDateToISODate(v.timestamp), options?.offsetConsumptionTimestamps),
        ...v.status && { status: v.status }
      }
    })
  })

  return {
    resource: rawData[0].resource,
    responseTimestamp: rawData[0].responseTimestamp,
    start: offsetTime(n3rgyDateToISODate(rawData[0].start), options?.offsetConsumptionTimestamps),
    end: offsetTime(n3rgyDateToISODate(rawData.length > 1 ? rawData[rawData.length - 1].end : rawData[0].end), options?.offsetConsumptionTimestamps),
    granularity: rawData[0].granularity,
    values,
    availableCacheRange: {
      start: offsetTime(n3rgyDateToISODate(rawData[0].availableCacheRange.start), options?.offsetConsumptionTimestamps),
      end: offsetTime(n3rgyDateToISODate(rawData[0].availableCacheRange.end), options?.offsetConsumptionTimestamps)
    },
    unit: rawData[0].unit,
  }
}