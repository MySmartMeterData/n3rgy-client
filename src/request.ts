import axios, { AxiosInstance, AxiosPromise, Method } from 'axios'
import { differenceInCalendarDays, parseISO } from 'date-fns'
import { N3rgyConfiguration, N3rgyConfigurationOptions, N3rgyResponse } from './types'
import { chunkDateRange, dateToN3rgyDateString } from './utils'

export class Request {
  private client: AxiosInstance
  private options: N3rgyConfigurationOptions

  constructor({ authToken, options }: N3rgyConfiguration) {
    this.options = options
    this.client = axios.create({
      baseURL: 'https://consumer-api.data.n3rgy.com',
      headers: {
        'authorization': authToken.toUpperCase().trim(),
        'content-type': 'application/json',
        'accept': 'application/json'
      },
    })

    this.client.interceptors.request.use(
      (request) => {
        if (request.params.start && request.params.end) {
          request.params.start = dateToN3rgyDateString(request.params.start)
          request.params.end = dateToN3rgyDateString(request.params.end)
        }
        return request
      }
    )
  }

  protected request({
    method = 'GET',
    endpoint,
    dateFilter,
    responseTransformer
  }: {
    method: Method
    endpoint: string
    dateFilter: {
      start?: string | Date,
      end?: string | Date
      duration?: number
    }
    responseTransformer: Function
  }) {
    const requests: AxiosPromise[] = []

    if (dateFilter.start && dateFilter.end) {
      dateFilter.start = parseISO(dateFilter.start as string)
      dateFilter.end = parseISO(dateFilter.end as string)
      dateFilter.duration = differenceInCalendarDays(dateFilter.end, dateFilter.start) + 1
    }

    if (!dateFilter.start && !dateFilter.end || dateFilter.duration && dateFilter.duration <= 90) {
      // <=90 days
      requests.push(this.client({
        method,
        url: endpoint,
        params: {
          start: dateFilter.start ? dateFilter.start : null,
          end: dateFilter.end ? dateFilter.end : null
        }
      }))
    } else {
      // >90 days
      const dateRange = chunkDateRange(dateFilter.start as Date, dateFilter.end as Date, this.options.maxDaysPerRequest)
      dateRange.forEach(range => {
        requests.push(this.client({
          method,
          url: endpoint,
          params: {
            start: range.start,
            end: range.end
          }
        }))
      })
    }

    return new Promise<N3rgyResponse>(async (resolve, reject) => {
      try {
        const responses = await Promise.all(requests)
        const data = responses.map((response: any) => response.data)
        resolve({
          data: responseTransformer(data, this.options),
          originalData: data,
          originalResponses: responses
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}