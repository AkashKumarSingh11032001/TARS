//  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
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-12g2sKeWftKJlsqJ54UJHP1j",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});


