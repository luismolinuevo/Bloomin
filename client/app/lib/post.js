export const getAllPosts = async () => {
    try {
      const posts = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
  
      if (posts.ok) {
        const res = await posts.json();
  
        return res;
      }
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };

  export const createPost = async (data, token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post`,
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
        console.error("Create post request request failed. Response status:", response.status);
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