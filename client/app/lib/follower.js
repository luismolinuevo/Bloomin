export const follow = async (data, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/follow/`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.error(
        "Follow request request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Follow user request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Log more details about the error
    console.error("Error during following user:", error);
    throw error;
  }
};

export const unfollow = async (user_id, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unfollow/${user_id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Un Follow request request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Follow user request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error during unfollowing user:", error);
    throw error;
  }
};
