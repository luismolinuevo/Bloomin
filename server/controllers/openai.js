import { generateResponse } from "../services/openai.js";

export async function generateAdvice(req, res) {
  const situation = req.body.situation || "";
  // Validate input (if needed)
  try {
    const response = await generateResponse(situation);
    console.log(response);
    res.status(200).json({ result: response, success: true });
  } catch (error) {
    console.log(`Error with OpenAI API request: ${error}`);
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
        success: false,
        error,
      },
    });
  }
}
