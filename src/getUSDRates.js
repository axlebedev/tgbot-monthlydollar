import * as dateFns from 'date-fns'

import getRequest from './getRequest'

const format = 'dd/MM/yyyy'
const url = 'http://www.cbr.ru/scripts/XML_dynamic.asp'

const getUrl = () => {
  const today = new Date()
  const todayStr = dateFns.format(today, format)
  const startOfMonthStr = dateFns.format(dateFns.startOfMonth(today), format)

  return `${url}?date_req1=${startOfMonthStr}&date_req2=${todayStr}&VAL_NM_RQ=R01235`
}

const getUSDRates = async () => {
  const response = await getRequest(getUrl())
  return response.ValCurs.Record
}

getUSDRates()

export default getUSDRates
