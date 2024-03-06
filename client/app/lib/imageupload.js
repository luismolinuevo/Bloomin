export const uploadImage = async (data) => {
  try {
    const formData = new FormData();
    formData.append("image", data);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      // Log more details about the failed response
      console.error("Image upload failed. Response status:", response.status);
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Image upload request failed");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};
