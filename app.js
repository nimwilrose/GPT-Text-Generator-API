const express = require('express');
const OpenAI = require('openai');
require('dotenv').config(); 

const app = express();
const port = 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

app.post('/generate-text', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 50
    });

    const generatedText = response.choices[0].text.trim(); 
    res.json({ generatedText });
  } catch (error) {
    console.error('Error in GPT request:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
