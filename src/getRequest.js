import http from 'http'
import { parseStringPromise } from 'xml2js'

const getRequest = (url) => {
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

export default getRequest
