import { consumptionDataMergeTransform, tariffDataMergeTransform } from './transformers'
import { N3rgyConfigurationOptions, N3rgyConsumption, N3rgyResponse, N3rgyTariff } from './types'
import { Request } from './request'

export class N3rgy extends Request {
  /**
   * Constructor
   * @param {String} authToken Test
   * @param {Object} [options] Test
   * @param {Boolean} [options.offsetConsumptionTimes] Test
   * @param {Number} [options.maxDaysPerRequest] Test
   */
  constructor(authToken: string, options: N3rgyConfigurationOptions = {
    offsetConsumptionTimestamps: false,
    maxDaysPerRequest: 90
  }) {
    super({ authToken, options })
  }

  /**
   * Get Gas consumption data
   * @param {string} [start] - the start date in ISO 8601 format
   * @param {string} [end] - the end date in ISO 8601
   * @returns {Promise} - consumption data
   */
  public getGasConsumption(start?: string, end?: string): Promise<N3rgyResponse<N3rgyConsumption>> {
    return this.request({
      method: 'GET',
      endpoint: '/gas/consumption/1',
      dateFilter: {
        start,
        end
      },
      responseTransformer: consumptionDataMergeTransform
    })
  }

  /**
   * Get gas tariff data
   * @param {string} [start] Date in ISO 8601 format to collect data from
   * @param {string} [end] Date in ISO 8601 format to collect data to
   * @returns {Promise}
   */
  public getGasTariff(start?: string, end?: string): Promise<N3rgyResponse<N3rgyTariff>> {
    return this.request({
      method: 'GET',
      endpoint: '/gas/tariff/1',
      dateFilter: {
        start,
        end
      },
      responseTransformer: tariffDataMergeTransform
    })
  }

  /**
   * Get Electricity consumption data
   * @param {string} [start] - the start date in ISO 8601 format
   * @param {string} [end] - the end date in ISO 8601
   * @returns {Promise<any>} - consumption data
   */
  public getElectricityConsumption(start?: string, end?: string): Promise<N3rgyResponse<N3rgyConsumption>> {
    return this.request({
      method: 'GET',
      endpoint: '/electricity/consumption/1',
      dateFilter: {
        start,
        end
      },
      responseTransformer: consumptionDataMergeTransform
    })
  }

  // /**
  //  * Get electricity production data
  //  * @param {string} [start] Date in ISO 8601 format to collect data from
  //  * @param {string} [end] Date in ISO 8601 format to collect data to
  //  * @returns {Promise}
  //  */
  // public getElectricityProduction(start?: string, end?: string): Promise<N3rgyResponse<N3rgyProduction>> {
  //   return this.request({
  //     method: 'GET',
  //     endpoint: '/electricity/production/1',
  //     dateFilter: {
  //       start,
  //       end
  //     },
  //     responseTransformer: null
  //   })
  // }

  /**
   * Get electricity tariff data
   * @param {string} [start] Date in ISO 8601 format to collect data from
   * @param {string} [end] Date in ISO 8601 format to collect data to
   * @returns {Promise}
   */
  public getElectricityTariff(start?: string, end?: string): Promise<N3rgyResponse<N3rgyTariff>> {
    return this.request({
      method: 'GET',
      endpoint: '/electricity/tariff/1',
      dateFilter: {
        start,
        end
      },
      responseTransformer: tariffDataMergeTransform
    })
  }
}