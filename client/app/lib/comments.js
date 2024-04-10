export const getComments = async (post_id, token, cursor, sort) => {
  try {
    const comments = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${post_id}?cursor=${
        cursor || ""
      }&&sort=${sort}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (comments.ok) {
      const res = await comments.json();

      return res;
    }
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const createComment = async (post_id, data, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/${post_id}`,
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
        "Create comment request request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Create comment request failed");
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

export const likeComment = async (comment_id, data, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commentlike/${comment_id}`,
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
        "Like comment request request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Like comment request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Log more details about the error
    console.error("Error liking comment:", error);
    throw error;
  }
};

export const deleteComment = async (comment_id, token) => {
  try {
    console.log(token);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/${comment_id}`,
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
        "Delete comment request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Delete comment request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Log more details about the error
    console.error("Error deleting post:", error);
    throw error;
  }
};
