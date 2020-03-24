import fs from 'fs'
import 'dotenv/config'
import { isEqual, startOfToday } from 'date-fns'
import maxBy from 'lodash/maxBy'
import getMonthAvg from './src/getMonthAvg'
import drawImage from './src/drawImage'

const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

const logToFile = (text) => {
  fs.appendFile(
    'log.txt',
    `\n${text}`,
    (err) => err && console.log('append log error: ', err),
  )
}

bot.start((ctx) => {
  ctx.reply('Welcome!')
})

// bot.help((ctx) => {
//   console.log('help ctx=', ctx.update.message)
//   ctx.reply('Send me a sticker')
// })
//
// bot.on('sticker', (ctx) => {
//   console.log('sticker ctx=', ctx.update.message)
//   ctx.reply('👍')
// })

let todaysCache = {
  date: null,
  base64: null,
  fileId: null,
  rate: null,
}

bot.on('text', async (ctx) => {
  const isBase64 = todaysCache.base64 !== null
  const isEqualDate = isEqual(todaysCache.date, startOfToday())
  if (!isBase64 || !isEqualDate) {
    console.log('draw new file', { isBase64, isEqualDate })
    logToFile(`draw new file ${JSON.stringify({ isBase64, isEqualDate })}`)
    const image = await drawImage()
    const rate = await getMonthAvg()
    todaysCache = {
      date: startOfToday(),
      base64: Buffer.from(image, 'base64'),
      rate,
      fileId: null,
    }
  }

  const response = await ctx.replyWithPhoto(todaysCache.fileId || { source: todaysCache.base64 })
  todaysCache.fileId = maxBy(response.photo).file_id
  ctx.reply(`${todaysCache.rate} - средний курс доллара с 1 числа по сегодня по курсу ЦБ РФ`)
  logToFile(
    JSON.stringify({ // eslint-disable-line prefer-template
      name: `${ctx.from.first_name} ${ctx.from.last_name}`,
      username: ctx.from.username,
      date: new Date(ctx.update.message.date * 1000),
      text: ctx.update.message.text,
    }),
  )
})

console.log('bot.launch')
bot.launch()
