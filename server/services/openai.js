import OpenAI from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

export async function generateResponse(situation) {
  // Validate input (if needed)

  try {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: generatePrompt(situation),
      temperature: 0.9,
      max_tokens: 250,
    });
    return completion?.choices[0]?.text;
  } catch (error) {
    throw error;
  }
}

function generatePrompt(situation) {
  return `You give advice on environmentally conscious things you can do to your home or place of living.
You respond with a max of 250 tokens, so you should keep your bullets straight to the point.
Don't give an intro or ending, just respond with 10 bullet points of things to do to be more environmentally conscious based on the following input:

${situation}`;
}
