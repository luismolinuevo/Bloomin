"use client"

import React, { useState, useEffect } from "react";
import Modal from "../General/Modal";
import { Input, Textarea, Button } from "../../utils/MaterialTailwind";
import { uploadImage } from "@/app/lib/imageupload";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/app/lib/auth";

export default function EditButton({ user, token, setLoading }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  console.log(user?.user?.userName);
  const [imageUrl, setImageUrl] = useState(user?.user?.imageUrl);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (user?.user?.userName) {
      setValue("userName", user.user.userName); // Set the default value for userName
    }
  }, [setValue, user]);

  const onEdit = async (data) => {
    // Receive form data from handleSubmit
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

      const body = {
        // Use form data here
        userName: data.userName,
        imageUrl: newImageUrl,
      };

      await updateProfile(body, token, user?.user?.id); // Make sure to await the updateProfile function
      setOpenModal(false);
    } catch (error) {
      console.error("There has been a error editing post", error);
    }
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
    <div>
      <button onClick={() => setOpenModal(!openModal)}>Edit Profile</button>

      <Modal onClose={() => setOpenModal(false)} isVisable={openModal}>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit(onEdit)}>
          <div>
            <input
              type="file"
              {...register("image")}
              onChange={handleImageChange}
            />
          </div>

          <div>
            <label>Username</label>
            <Input
              type="text"
              label="Username"
              {...register("userName", { required: true })}
              error={errors.userName}
              helperText={errors.userName && "Username is required"}
              className="w-[230px]"
              size="md"
            />
          </div>
          <div>
            <button type="submit">Edit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
