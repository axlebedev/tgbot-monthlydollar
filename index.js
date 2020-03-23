import 'dotenv/config'
import { isEqual, startOfToday } from 'date-fns'
import getMonthAvg from './src/getMonthAvg'
import drawImage from './src/drawImage'

const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.start((ctx) => {
  console.log('start ctx=', ctx)
  ctx.reply('Welcome!')
})

bot.help((ctx) => {
  console.log('help ctx=', ctx.update.message)
  ctx.reply('Send me a sticker')
})

bot.on('sticker', (ctx) => {
  console.log('sticker ctx=', ctx.update.message)
  ctx.reply('👍')
})

let todaysCache = {
  date: null,
  base64: null,
  rate: null,
}

bot.on('text', async (ctx) => {
  console.log('text ctx=', ctx.update.message)
  if (todaysCache.base64 === null || !isEqual(todaysCache.date, startOfToday())) {
    const image = await drawImage()
    const rate = await getMonthAvg()
    todaysCache = {
      date: startOfToday(),
      base64: Buffer.from(image, 'base64'),
      rate,
    }
  }

  ctx.replyWithPhoto({ source: todaysCache.base64 })
  ctx.reply(todaysCache.rate)
})

console.log('bot.launch')
bot.launch()
