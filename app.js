// Transaction Form Submission Logic
document.getElementById('fraud-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const userId = document.getElementById('user-id').value;
    const amount = document.getElementById('amount').value;
    const location = document.getElementById('location').value;
    const time = document.getElementById('time').value;

    const isFraud = detectFraud(amount, location, time);

    const result = document.getElementById('result');
    result.style.transition = 'all 0.5s ease-in-out';
    if (isFraud) {
        result.textContent = '🚨 Fraudulent Transaction Detected!';
        result.style.color = 'red';
    } else {
        result.textContent = '✅ Transaction Approved.';
        result.style.color = 'green';
    }
});

function detectFraud(amount, location, time) {
    let maxAmount = 1000;
    let hour = new Date(time).getHours();
    
    // Example fraud detection logic
    if (amount > maxAmount || (location === 'Other' && hour < 6)) {
        return true;
    }
    return false;
}

// Chatbot Logic
const chatbotContainer = document.getElementById('chatbot-container');
const openChatbotBtn = document.getElementById('open-chatbot');
const closeChatBtn = document.getElementById('close-chat');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const sendMessageBtn = document.getElementById('send-message');

openChatbotBtn.addEventListener('click', function () {
    chatbotContainer.style.display = 'flex';
    openChatbotBtn.style.display = 'none';
});

closeChatBtn.addEventListener('click', function () {
    chatbotContainer.style.display = 'none';
    openChatbotBtn.style.display = 'block';
});

sendMessageBtn.addEventListener('click', function () {
    const userMessage = chatbotInput.value;
    if (userMessage.trim()) {
        addChatMessage('You', userMessage);
        chatbotInput.value = '';
        setTimeout(() => {
            const botReply = generateBotReply(userMessage);
            addChatMessage('Bot', botReply);
        }, 1000);
    }
});

function addChatMessage(sender, message) {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbotMessages.appendChild(newMessage);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function generateBotReply(message) {
    // Simulate simple chatbot response
    if (message.toLowerCase().includes('fraud')) {
        return "We're here to help you detect and prevent fraud!";
    }
    return "I'm not sure about that. Can you ask something else?";
}

// const chatbotContainer = document.getElementById('chatbot-container');
// const openChatbotBtn = document.getElementById('open-chatbot');
// const closeChatBtn = document.getElementById('close-chat');
// const chatbotMessages = document.getElementById('chatbot-messages');
// const chatbotInput = document.getElementById('chatbot-input');
// const sendMessageBtn = document.getElementById('send-message');

// openChatbotBtn.addEventListener('click', function () {
//     chatbotContainer.style.display = 'flex';
//     openChatbotBtn.style.display = 'none';
// });

// closeChatBtn.addEventListener('click', function () {
//     chatbotContainer.style.display = 'none';
//     openChatbotBtn.style.display = 'block';
// });

// sendMessageBtn.addEventListener('click', function () {
//     const userMessage = chatbotInput.value;
//     if (userMessage.trim()) {
//         addChatMessage('You', userMessage);
//         chatbotInput.value = '';

//         // Send message to the server and get AI response
//         fetch('/api/chatbot', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ message: userMessage }),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             addChatMessage('Bot', data.reply);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             addChatMessage('Bot', 'Oops! Something went wrong.');
//         });
//     }
// });

// function addChatMessage(sender, message) {
//     const newMessage = document.createElement('div');
//     newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
//     chatbotMessages.appendChild(newMessage);
//     chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
// }

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { OpenAIApi } = require('openai'); 
// const { Configuration } = require('openai'); 

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Configure OpenAI API
// const configuration = new Configuration({
//     apiKey: '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', // Replace with your OpenAI API key
// });
// const openai = new OpenAIApi(configuration);

// // Chatbot Logic Endpoint (AI-Powered)
// app.post('/api/chatbot', async (req, res) => {
//     const { message } = req.body;

//     try {
//         // Request to OpenAI GPT model
//         const response = await openai.createCompletion({
//             model: 'text-davinci-003', // OpenAI's GPT-3 model
//             prompt: `You are a fraud detection assistant chatbot. Answer the following question: "${message}"`,
//             max_tokens: 150,
//             temperature: 0.7,
//         });

//         const aiReply = response.data.choices[0].text.trim();
//         res.json({ reply: aiReply });
//     } catch (error) {
//         console.error('Error fetching AI response:', error);
//         res.status(500).json({ reply: 'Oops! Something went wrong. Please try again.' });
//     }
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
