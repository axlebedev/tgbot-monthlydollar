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
  console.log('help ctx=', ctx.update.message)
  ctx.reply('Send me a sticker')
})

bot.on('sticker', (ctx) => {
  console.log('sticker ctx=', ctx.update.message)
  ctx.reply('👍')
})

bot.on('text', async (ctx) => {
  console.log('text ctx=', ctx.update.message)
  if (ctx.update.message.text === 'hi') {
    const image = await drawImage()
    ctx.replyWithPhoto({ source: Buffer.from(image, 'base64') })
    return
  }
  const reply = await getMonthAvg()
  ctx.reply(reply)
})

console.log('bot.launch')
bot.launch()
