"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../General/Modal";
import { Input, Textarea, Button } from "@material-tailwind/react";
import cookie from "js-cookie";
import { createPost } from "@/app/lib/post";
import {
  implementationDifficulty,
  housingOption,
} from "../../utils/SelectOptions.js";
import Select from "react-select";
import { uploadImage } from "@/app/lib/imageupload";

export default function CreatePost() {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const token = cookie.get("user_token");

  const onSubmit = async (data) => {
    try {
      let imageUrl = null;
      if (data.image[0] != null) {
        const upload = await uploadImage(data.image[0]);
        if (upload.data) {
          console.log(upload.data);
          imageUrl = upload.data;
        } else {
          //need to have some from a error alert
          console.error("Error uploading image");
        }
      }

      console.log("Image URL " + imageUrl)
      let postData = {
        title: data.title,
        description: data.description,
        cost: data.cost,
        target: data.target,
        livingSituation: data.housingType,
        implementationDifficulty: data.implementationDifficulty,
        city: "bronx",
        img: imageUrl, // Assuming only one image is uploaded
      };

      if (token != null) {
        createPost(postData, token);
      }

      setOpenModal(false);
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  // implementationDifficulty: req.body.implementationDifficulty,
  // city: req.body.city,
  // userId: req.user.id,
  const handleHousingTypeChange = (selectedOption) => {
    setValue("housingType", selectedOption.value);
  };

  const handleImplementationDifficultyChange = (selectedOption) => {
    setValue("implementationDifficulty", selectedOption.value);
  };

  return (
    <div>
      <button onClick={() => setOpenModal(!openModal)}>
        Create a new post
      </button>
      <Modal onClose={() => setOpenModal(false)} isVisable={openModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h1 className="text-[25px] text-center text-bold">Create Post</h1>
          <div className="flex gap-5 my-5 justify-between">
            <div>
              <label>Title</label>
              <Input
                type="text"
                label="Title"
                {...register("title", { required: true })}
                error={errors.title}
                helperText={errors.title && "Title is required"}
                className="w-[230px]"
                size=""
              />
            </div>
            <div>
              <label>Who is it good for?</label>
              <Input
                type="text"
                label="Who is it good for?"
                {...register("target")}
                className="w-[230px]"
                size=""
              />
            </div>
          </div>
          <div>
            <label>Description</label>
            <Textarea
              type="text"
              label="Description"
              {...register("description", { required: true })}
              error={errors.description}
              helperText={errors.description && "Description is required"}
              className="w-[480px]"
            />
          </div>
          <div className="flex gap-5 my-5 justify-between">
            <div>
              <label>Cost</label>
              <Input
                type="number"
                label="Cost"
                {...register("cost")}
                className="w-[230px]"
              />
            </div>
            <div>
              <label>City</label>
              <Input
                type="text"
                label="City"
                {...register("city", { required: true })}
                error={errors.city}
                helperText={errors.city && "City is required"}
                className="w-[230px]"
              />
            </div>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <label>Housing Type</label>
              <Select
                {...register("housingType", { required: true })}
                label="Housing Type"
                options={housingOption}
                onChange={handleHousingTypeChange}
                className="w-[233px]"
              />
            </div>
            <div>
              <label>Implementation Difficulty</label>
              <Select
                label="Implementation Difficulty"
                {...register("implementationDifficulty", { required: true })}
                options={implementationDifficulty}
                onChange={handleImplementationDifficultyChange}
                className="w-[233px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 my-5">
            <label>Upload Image</label>
            <input type="file" {...register("image")} />
          </div>

          <div className="flex justify-center ">
            <Button
              type="submit"
              className="bg-[#459858] px-4 rounded-lg text-white h-[40px]"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
