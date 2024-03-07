export const favoritePost = async (data, token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data),
        }
      );
  
      if (!response.ok) {
        console.error("Favorite post request request failed. Response status:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
  
        throw new Error("Favorite post request failed");
      }
  
      // If the response is successful, return the data (if needed)
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      // Log more details about the error
      console.error("Error during faving post:", error);
      throw error;
    }
  };