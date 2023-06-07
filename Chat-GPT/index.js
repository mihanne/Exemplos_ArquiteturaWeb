const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const configuration = new Configuration({
    organization: "org-5caiVo8hUGKimOknJVw1pTq8",
    apiKey: process.env.OPENAI_API_KEY,
});
  const openai = new OpenAIApi(configuration);

  async function runCompletion () {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "fale sobre o Brasil",
      temperature: 0,
      max_tokens: 200
    });
    console.log(completion.data.choices[0].text);
    }

runCompletion();
