export const getAllPosts = async (token) => {
  try {
    const posts = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.error(
        "Create post request request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Signup request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Log more details about the error
    console.error("Error during creating post:", error);
    throw error;
  }
};

export const votePost = async (post_id, token, type) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/postlike/${post_id}?type=${type}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Vote post request request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Vote request failed");
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

export const getPost = async (post_id) => {
  try {
    const post = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post/${post_id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (post.ok) {
      const res = await post.json();

      return res;
    }
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
