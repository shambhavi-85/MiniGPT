import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from "openai";

dotenv.config();


// Verify if the OPENAI_API_KEY is loaded correctly
if (!process.env.OPENAI_API_KEY) {
    console.error('The OPENAI_API_KEY environment variable is missing or empty.');
    process.exit(1);
}


const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    organization: "org-HBK6BvHsyAygkQLoUZb9J2vY",
    apiKey: process.env.OPENAI_API_KEY,
});






app.get('/', async(req, res) => {
    res.status(200).send({
        message: 'Hello from MiniGPT',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `${prompt}` ,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
        
    }
});
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));