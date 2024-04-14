import React, { useState } from "react";
import Modal from "../General/Modal";
import { Input, Textarea, Button } from "../../utils/MaterialTailwind";
import { uploadImage } from "@/app/lib/imageupload";
import { useForm } from "react-hook-form";

export default function EditButton({ userName, profileImg }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: userName || "",
    },
  });

  const [imageUrl, setImageUrl] = useState(profileImg);
  const [openModal, setOpenModal] = useState(false);

  const onEdit = async () => {
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

      const data = {
        //i want data here
        userName: data.userName,
        imgUrl: newImageUrl,
      };
    } catch (error) {}
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
