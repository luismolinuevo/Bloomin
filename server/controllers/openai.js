import { generateResponse } from "../services/openaiService";

export async function generateAdvice(req, res) {
  const situation = req.body.situation || "";
  // Validate input (if needed)
  try {
    const response = await generateResponse(situation);
    res.status(200).json({ result: response, success: true });
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
        success: false,
        error,
      },
    });
  }
}

export { generateAdvice };
