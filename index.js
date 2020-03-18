import 'dotenv/config'
// import TelegramBot from 'node-telegram-bot-api'
//
// console.log('process.env.TELEGRAM_TOKEN=', process.env.TELEGRAM_TOKEN);
// const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })
//
// // Написать мне ...
// // (/echo Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   console.log('%c11111', 'background:#00FF00', 'msg=', msg);
//   const fromId = msg.from.id // Получаем ID отправителя
//   const resp = match[1] // Получаем текст после /echo
//   bot.sendMessage(fromId, resp)
// })
//
// // Простая команда без параметров
// bot.on('message', (msg) => {
//   console.log('%c11111', 'background:#00FF00', 'msg=', msg);
//   const chatId = msg.chat.id // Берем ID чата (не отправителя)
//   bot.sendMessage(chatId, 'Иди на хуй отсюдова')
// })

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
bot.on('text', (ctx) => {
  console.log('text ctx=', ctx)
  ctx.reply('👍')
})
bot.hears('hi', (ctx) => {
  console.log('hi ctx=', ctx)
  ctx.reply('Hey there')
})
console.log('bot.launch')
bot.launch()
