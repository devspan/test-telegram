const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

app.post('/webhook', async (req, res) => {
  const { message } = req.body;

  console.log('Received webhook request:', req.body);

  if (message && message.text === '/start') {
    const chatId = message.chat.id;
    const text = 'Click the button below to open the mini-app:';
    const replyMarkup = {
      inline_keyboard: [
        [{ text: 'Open Mini-App', web_app: { url: WEB_APP_URL } }],
      ],
    };

    try {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text,
        reply_markup: replyMarkup,
      });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});