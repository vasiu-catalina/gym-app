const OpenAI = require("openai");

module.exports = async (content) => {
    const { OPENAI_API_KEY } = process.env;

    const client = new OpenAI({
        apiKey: OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a professional gym planner." },
            { role: "user", content },
        ],
    });

    return completion.choices[0].message.content;
};
