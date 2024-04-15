import cookie from "js-cookie";

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

export const signin = async (data) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
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
      console.error("Signin request failed. Response status:", response.status);
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Signup request failed");
    }

    const responseData = await response.json();
    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const getUser = async (token) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (user.ok) {
      const res = await user.json();

      return res;
    }
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getUserProfileData = async (token, user_id) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userprofile/${user_id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (user.ok) {
      const res = await user.json();

      return res;
    }
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const updateProfile = async (data, token, user_id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userprofile/${user_id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.error(
        "Edit post request request failed. Response status:",
        response.status
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Edit post request failed");
    }

    // If the response is successful, return the data (if needed)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Log more details about the error
    console.error("Error during editing post:", error);
    throw error;
  }
};
