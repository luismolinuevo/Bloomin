export const getComments = async (post_id) => {
    try {
      const comments = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${post_id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
  
      if (comments.ok) {
        const res = await post.json();
  
        return res;
      }
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };