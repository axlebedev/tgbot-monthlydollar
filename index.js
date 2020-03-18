import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
const port = 3700

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
) // for parsing application/x-www-form-urlencoded

// This is the route the API will call
app.post(
  '/new-message',
  (req, res) => {
    const { message } = req.body

    console.log('%c11111', 'background:#00FF00', 'req.body=', req.body)
    // Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    if (!message) {
      // In case a message is not present, or if our message does not have the word marco in it,
      // do nothing and return an empty response
      return res.end()
    }

    // If we've gotten this far,
    // it means that we have received a message containing the word "marco".
    // Respond by hitting the telegram bot API and responding to
    // the approprite chat_id with the word "Polo!!"
    // Remember to use your own API toked instead of the one below
    // "https://api.telegram.org/bot<your_api_token>/sendMessage"
    axios
      .post(
        'https://api.telegram.org/bot1096030733:AAHr0x5NUgLW8QPrWtWyzYu_Ojx5QR-OnKI/sendMessage',
        {
          chat_id: message.chat.id,
          text: 'Polo!!',
        },
      )
      .then(() => {
        // We get here if the message was successfully posted
        console.log('Message posted')
        res.end('ok')
      })
      .catch((err) => {
        // ...and here if it was not
        console.log('Error :', err)
        res.end(`Error :${err}`)
      })
    return null
  },
)

// Finally, start our server
app.listen(port, () => {
  console.log(`Telegram app listening on port ${port}!`)
})
