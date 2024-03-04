"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../General/Modal";
import {
  Select,
  Option,
  Input,
  Textarea,
} from "@material-tailwind/react";

export default function CreatePost() {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission here
    setOpenModal(false); // Close modal after form submission
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
            label="Housing Type"
            {...register("housingType")}
            defaultValue=""
          >
            <Option value="">Select housing type</Option>
            <Option value="Apartment">Apartment</Option>
            <Option value="House">House</Option>
            <Option value="Condo">Condo</Option>
            <Option value="Townhouse">Townhouse</Option>
          </Select>
          {/* Input for image upload */}
          <input type="file" {...register("image")} />
          <button color="blue" buttonType="filled" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
