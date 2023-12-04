export const signup = async (data) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      // Log more details about the failed response
      console.error("Signup request failed. Response status:", response.status);
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Signup request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Log more details about the error
    console.error("Error during signup:", error);
    throw error;
  }
};
