const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

module.exports = async (req, res) => {
  if (req.method === 'POST') {
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

    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};