import http from 'http'
import { parseStringPromise } from 'xml2js'
import find from 'lodash/find'

const url = 'http://www.cbr.ru/scripts/XML_val.asp?d=0'

const getUSDCode = () => {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      res.setEncoding('utf8')
      let body = ''
      res.on('data', (data) => {
        body += data
      })
      res.on('end', () => {
        parseStringPromise(body)
          .then(resolve)
      })
    })
  })
}

const getUSDCodePromise = async () => {
  const values = await getUSDCode()
  const usd = find(
    values.Valuta.Item,
    (item) => item.EngName[0] === 'US Dollar',
  )
  return usd.$.ID
}

export default getUSDCodePromise
