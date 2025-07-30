require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // <-- Add this line

const app = express();
app.use(cors());

app.get('/api/affirmation', async (req, res) => {
  try {
    const response = await fetch('https://www.affirmations.dev/');
    const data = await response.json();

    res.json({
      affirmation: data.affirmation,
      category: 'random' // since affirmations.dev doesn't support categories
    });
  } catch (error) {
    console.error('🔴 Fetch Error:', error);
    res.status(500).json({ error: 'Failed to get affirmation from public API.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));


/*require('dotenv').config();
const express = require('express');
const cors = require('cors');
const loadPrompt = require('./utils/loadPrompt');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/api/affirmation', async (req, res) => {
  const category = req.query.category || 'self-worth';
  const prompt = loadPrompt(category);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.user }
      ]
    });

    const message = response.choices[0].message.content.trim();
    res.json({ affirmation: message, category });
  } catch (error) {
    console.error('Full Error:', JSON.stringify(error, null, 2));
    res.status(500).json({ error: 'Failed to generate affirmation.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));

*/