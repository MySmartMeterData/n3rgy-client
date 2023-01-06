import { AxiosResponse } from "axios"

export interface N3rgyConfiguration {
  authToken: string
  options: N3rgyConfigurationOptions
}

export interface N3rgyConfigurationOptions {
  offsetConsumptionTimestamps?: boolean
  offsetTariffTimestamps?: boolean
  maxDaysPerRequest?: number
}

export interface N3rgyResponse<T = any> {
  data: T
  originalData: T[]
  originalResponses: AxiosResponse[]
}

export interface N3rgyConsumption {
  resource: string
  responseTimestamp: string
  start: string
  end: string
  granularity: N3rgyConsumptionGranularity
  values: N3rgyConsumptionValue[]
  availableCacheRange: N3rgyAvaliableCacheRange
  message?: string
  unit: N3rgyConsumptionUnit
}

export type N3rgyConsumptionGranularity = 'halfhour'

export interface N3rgyConsumptionValue {
  value: number
  timestamp: string
  status?: string
}

export interface N3rgyAvaliableCacheRange {
  start: string
  end: string
}

export type N3rgyConsumptionUnit = 'kWh' | 'm3'

export interface N3rgyTariff {
  resource: string
  responseTimestamp: string
  start: string
  end: string
  values: N3rgyTariffValues[]
  availableCacheRange: N3rgyAvaliableCacheRange
  message?: string
}

export interface N3rgyTariffValues {
  additionalInformation?: string
  standingCharges: N3rgyStandingCharges[]
  prices: N3rgyPrices[]
}

export interface N3rgyStandingCharges {
  startDate: string
  value: number
}

export interface N3rgyPrices {
  timestamp: string
  value: number
}

export interface N3rgyProduction { }
