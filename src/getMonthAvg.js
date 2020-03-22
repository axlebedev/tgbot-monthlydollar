import sum from 'lodash/sum'
import round from 'lodash/round'

import getUSDRates from './getUSDRates'

const getMonthAvg = async () => {
  const usdRates = await getUSDRates()
  const values = usdRates.map(({ Value }) => {
    const strValue = Value[0].replace(',', '.')
    return parseFloat(strValue)
  })

  return round(sum(values) / values.length, 4)
}
getMonthAvg()

export default getMonthAvg
