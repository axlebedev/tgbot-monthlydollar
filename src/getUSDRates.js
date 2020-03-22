import * as dateFns from 'date-fns'

import getRequest from './utils/getRequest'
import {
  requestDateFormat,
  outputDateFormat,
} from './const'

const url = 'http://www.cbr.ru/scripts/XML_dynamic.asp'

const getUrl = () => {
  const today = new Date()
  const todayStr = dateFns.format(today, requestDateFormat)
  const startOfMonthStr = dateFns.format(dateFns.startOfMonth(today), requestDateFormat)

  return `${url}?date_req1=${startOfMonthStr}&date_req2=${todayStr}&VAL_NM_RQ=R01235`
}

const getUSDRates = async () => {
  const response = await getRequest(getUrl())
  if (response === null) {
    return null
  }

  const values = response.ValCurs.Record
  return values.map((value) => {
    return {
      date: dateFns.parse(value.$.Date, outputDateFormat, new Date()),
      value: parseFloat(value.Value[0].replace(',', '.')),
    }
  })
}

export default getUSDRates
