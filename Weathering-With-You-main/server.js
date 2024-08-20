const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const token = 'a4jykbsthdp2a94j';
const mobile = '+918084948048';
const audio = "https://drive.google.com/uc?export=download&id=1c-E0vPo2GYU_mroBEBZG9Mpb6vZRrvjd";
const message = "Hey love, as the rain falls, it reminds me of your laughter – a beautiful melody. Wish I could be there to dance in the rain with you. Miss you lots ❤❤❤✨";

// Route to handle sending WhatsApp messages
app.post('/send-message', (req, res) => {
    const data = {
        token: token,
        to: mobile,
        body: message,
    };

    axios.post('https://api.ultramsg.com/instance91954/messages/chat', data)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).send(error.response.data));
});

// Route to handle sending WhatsApp audio
app.post('/send-audio', (req, res) => {
    const data = {
        token: token,
        to: mobile,
        audio: audio,
    };

    axios.post('https://api.ultramsg.com/instance91954/messages/audio', data)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).send(error.response.data));
});

app.listen(3000, () => console.log('Server running on port 3000'));
