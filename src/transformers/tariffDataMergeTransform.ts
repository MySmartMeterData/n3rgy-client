import { N3rgyConfigurationOptions, N3rgyPrices, N3rgyStandingCharges, N3rgyTariff, N3rgyTariffValues } from "../types";
import { offsetTime, n3rgyDateToISODate } from "../utils";

export function tariffDataMergeTransform(rawData: N3rgyTariff[], options?: N3rgyConfigurationOptions): N3rgyTariff {
  const values: N3rgyTariffValues[] = rawData.flatMap((data: N3rgyTariff) => {
    return data.values.map((v: N3rgyTariffValues) => {
      return {
        ...v.additionalInformation && { additionalInformation: v.additionalInformation },

        standingCharges: v.standingCharges.map((standingCharge: N3rgyStandingCharges) => {
          return {
            startDate: n3rgyDateToISODate(standingCharge.startDate),
            value: standingCharge.value
          }
        }),

        prices: v.prices.map((p: N3rgyPrices) => {
          return {
            timestamp: offsetTime(n3rgyDateToISODate(p.timestamp), options?.offsetTariffTimestamps),
            value: p.value
          }
        })
      }
    })
  })

  return {
    resource: rawData[0].resource,
    responseTimestamp: rawData[0].responseTimestamp,
    start: offsetTime(n3rgyDateToISODate(rawData[0].start), options?.offsetTariffTimestamps),
    end: offsetTime(n3rgyDateToISODate(rawData.length > 1 ? rawData[rawData.length - 1].end : rawData[0].end), options?.offsetTariffTimestamps),
    values,
    availableCacheRange: {
      start: offsetTime(n3rgyDateToISODate(rawData[0].availableCacheRange.start), options?.offsetConsumptionTimestamps),
      end: offsetTime(n3rgyDateToISODate(rawData[0].availableCacheRange.end), options?.offsetConsumptionTimestamps)
    },
  }
}
