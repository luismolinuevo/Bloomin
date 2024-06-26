export const getCommentReplies = async (comment_id, token) => {
  try {
    const comments = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commentreply/${comment_id}`,
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

export const createCommentReply = async (comment_id, data, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commentreply/${comment_id}`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commentreplylike/${comment_id}`,
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
        "Like comment reply request request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Like comment reply request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Log more details about the error
    console.error("Error liking comment reply: ", error);
    throw error;
  }
};

export const deleteCommentReply = async (comment_id, token) => {
  try {
    console.log(token);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commentreply/${comment_id}`,
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
        "Delete comment reply request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Delete comment reply request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Log more details about the error
    console.error("Error deleting comment reply:", error);
    throw error;
  }
};
