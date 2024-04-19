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

export default function CreatePost({ setLoading }) {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const token = cookie.get("user_token");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = null;
      if (data.image[0] != null) {
        const upload = await uploadImage(data.image[0]);
        if (upload.data) {
          imageUrl = upload.data;
        } else {
          console.error("Error uploading image");
        }
      }

      let postData = {
        title: data.title,
        description: data.description,
        cost: data.cost,
        target: data.target,
        livingSituation: data.housingType,
        implementationDifficulty: data.implementationDifficulty,
        city: data.city,
        img: imageUrl,
      };

      if (token != null) {
        createPost(postData, token);
      }

      setOpenModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  const handleHousingTypeChange = (selectedOption) => {
    setValue("housingType", selectedOption.value);
  };

  const handleImplementationDifficultyChange = (selectedOption) => {
    setValue("implementationDifficulty", selectedOption.value);
  };

  return (
    <div>
      <button onClick={() => setOpenModal(!openModal)} className="border-[#459858] border text-[#459858] px-4 py-2 rounded-md mb-4">
        Create a new post
      </button>
      <Modal onClose={() => setOpenModal(false)} isVisable={openModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <h1 className="text-xl font-semibold mb-4">Create Post</h1>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <Input
              type="text"
              label="Title"
              {...register("title", { required: true })}
              error={errors.title}
            />
            {errors.title && <p className="text-red-500">Title is required</p>}
          </div>
          {/* <div className="mb-4">
            <label className="block mb-1">Who is it good for?</label>
            <Input
              type="text"
              label="Who is it good for?"
              {...register("target")}
            />
          </div> */}
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <Textarea
              type="text"
              label="Description"
              {...register("description", { required: true })}
              error={errors.description}
            />
            {errors.description && <p className="text-red-500">Description is required</p>}
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
              <label className="block mb-1">Cost</label>
              <Input
                type="number"
                label="Cost"
                {...register("cost")}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label className="block mb-1">City</label>
              <Input
                type="text"
                label="City"
                {...register("city", { required: true })}
                error={errors.city}
              />
              {errors.city && <p className="text-red-500">City is required</p>}
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
              <label className="block mb-1">Housing Type</label>
              <Select
                {...register("housingType", { required: true })}
                label="Housing Type"
                options={housingOption}
                onChange={handleHousingTypeChange}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label className="block mb-1">Implementation Difficulty</label>
              <Select
                label="Implementation Difficulty"
                {...register("implementationDifficulty", { required: true })}
                options={implementationDifficulty}
                onChange={handleImplementationDifficultyChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Upload Image</label>
            <input type="file" {...register("image")} />
          </div>
          <div className="flex justify-center">
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
