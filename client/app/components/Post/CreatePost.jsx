"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../General/Modal";
import { Input, Textarea } from "@material-tailwind/react";
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
          console.log(upload.data)
          imageUrl = upload.data;
        } else {
          //need to have some from a error alert
          console.error("Error uploading image")
        }
      }
      let postData = {
        title: data.title,
        description: data.description,
        cost: data.cost,
        target: data.target,
        livingSituation: data.housingType,
        implementationDifficulty: data.implementationDifficulty,
        city: "bronx",
        img: data.image[0] && imageUrl != null ? imageUrl : null, // Assuming only one image is uploaded
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label="Title"
            {...register("title", { required: true })}
            error={errors.title}
            helperText={errors.title && "Title is required"}
          />
          <Textarea
            type="text"
            label="Description"
            {...register("description", { required: true })}
            error={errors.description}
            helperText={errors.description && "Description is required"}
          />
          <Input type="number" label="Cost" {...register("cost")} />
          <Input
            type="text"
            label="Who is it good for?"
            {...register("target")}
          />
          <Select
            {...register("housingType", { required: true })}
            label="Housing Type"
            options={housingOption}
            onChange={handleHousingTypeChange}
          />
          <Select
            label="Implementation Difficulty"
            {...register("implementationDifficulty", { required: true })}
            options={implementationDifficulty}
            onChange={handleImplementationDifficultyChange}
          />
          {/* Input for image upload */}
          <input type="file" {...register("image")} />
          <button color="blue" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
