import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../General/Modal";
import { Input, Textarea, Button } from "@material-tailwind/react";
import Select from "react-select";
import { uploadImage } from "@/app/lib/imageupload";
// import { updatePost } from "@/app/lib/post"; // Assuming you have an updatePost function
import { housingOption, implementationDifficulty } from "@/app/utils/SelectOptions";

export default function EditPost({ token, post, onClose, isVisible }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState(post.img);
  console.log("Im in the edit mod")
  useEffect(() => {
    setValue("title", post?.title);
    setValue("target", post?.target);
    setValue("description", post?.description);
    setValue("cost", post?.cost);
    setValue("city", post?.city);
    setValue("housingType", post?.livingSituation);
    setValue("implementationDifficulty", post?.implementationDifficulty);
    console.log("I enter")
  }, [post]);

  const onSubmit = async (data) => {
    try {
      let newImageUrl = imageUrl;
      if (data.image[0] !== undefined) {
        const upload = await uploadImage(data.image[0]);
        if (upload.data) {
          newImageUrl = upload.data;
        } else {
          console.error("Error uploading image");
        }
      }

      const updatedPostData = {
        id: post.id, // Assuming post.id exists
        title: data.title,
        description: data.description,
        cost: data.cost,
        target: data.target,
        livingSituation: data.housingType,
        implementationDifficulty: data.implementationDifficulty,
        city: data.city,
        img: newImageUrl,
      };

    //   await updatePost(updatedPostData, token);
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  const handleHousingTypeChange = (selectedOption) => {
    setValue("housingType", selectedOption.value);
  };

  const handleImplementationDifficultyChange = (selectedOption) => {
    setValue("implementationDifficulty", selectedOption.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal onClose={onClose} isVisible={isVisible}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[25px] text-center text-bold">Edit Post</h1>
        {/* Form Fields */}
        {/* Title */}
        <Input
          type="text"
          label="Title"
          {...register("title", { required: true })}
          error={errors.title}
          helperText={errors.title && "Title is required"}
        />
        {/* Who is it good for? */}
        <Input
          type="text"
          label="Who is it good for?"
          {...register("target")}
        />
        {/* Description */}
        <Textarea
          type="text"
          label="Description"
          {...register("description", { required: true })}
          error={errors.description}
          helperText={errors.description && "Description is required"}
        />
        {/* Cost */}
        <Input
          type="number"
          label="Cost"
          {...register("cost")}
        />
        {/* City */}
        <Input
          type="text"
          label="City"
          {...register("city", { required: true })}
          error={errors.city}
          helperText={errors.city && "City is required"}
        />
        {/* Housing Type */}
        <Select
          {...register("housingType", { required: true })}
          label="Housing Type"
          options={housingOption}
          onChange={handleHousingTypeChange}
        />
        {/* Implementation Difficulty */}
        <Select
          label="Implementation Difficulty"
          {...register("implementationDifficulty", { required: true })}
          options={implementationDifficulty}
          onChange={handleImplementationDifficultyChange}
        />
        {/* Upload Image */}
        <input type="file" {...register("image")} onChange={handleImageChange} />
        {/* Submit Button */}
        <Button type="submit" className="bg-[#459858] px-4 rounded-lg text-white h-[40px]">
          Submit
        </Button>
      </form>
    </Modal>
  );
}
