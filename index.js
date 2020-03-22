import 'dotenv/config'
import getMonthAvg from './src/getMonthAvg'
import drawImage from './src/drawImage'

const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.start((ctx) => {
  console.log('start ctx=', ctx)
  ctx.reply('Welcome!')
})

bot.help((ctx) => {
  console.log('help ctx=', ctx)
  ctx.reply('Send me a sticker')
})

bot.on('sticker', (ctx) => {
  console.log('sticker ctx=', ctx)
  ctx.reply('👍')
})

bot.on('text', async (ctx) => {
  console.log('text ctx=', ctx)
  const reply = await getMonthAvg()
  ctx.reply(reply)
})

bot.hears('hi', async (ctx) => {
  console.log('hi ctx=', ctx)
  const image = await drawImage()
  ctx.replyWithPhoto(image)
})

console.log('bot.launch')
bot.launch()
