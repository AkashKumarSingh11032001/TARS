//  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
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')

const configuration = new Configuration({
    organization: "org-12g2sKeWftKJlsqJ54UJHP1j",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);
// const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Say this is a test",
//     max_tokens: 7,
//     temperature: 0,
// });


const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async (req, res) => {
    const {message} = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    res.json({
        message: response.data.choices[0].text
    })
});

app.listen(port, () => {
    console.log(`Listining at port https://localhost:${port}`)
});