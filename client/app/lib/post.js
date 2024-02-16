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