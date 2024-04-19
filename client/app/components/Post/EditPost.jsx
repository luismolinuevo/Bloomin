import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../General/Modal";
import { Input, Textarea, Button } from "../../utils/MaterialTailwind"; // Assuming MaterialTailwind components are used for styling
import Select from "react-select";
import { uploadImage } from "@/app/lib/imageupload";
import { updatePost } from "@/app/lib/post";
import {
  housingOption,
  implementationDifficulty,
} from "../../utils/SelectOptions";

export default function EditPost({ token, post, onClose, isVisible, setLoading }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      target: post?.target || "",
      description: post?.description || "",
      cost: post?.cost || "",
      city: post?.city || "",
      housingType: post?.livingSituation || "",
      implementationDifficulty: post?.implementationDifficulty || "",
    },
  });

  const [imageUrl, setImageUrl] = useState(post.img);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
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
        id: post.id,
        title: data.title,
        description: data.description,
        cost: data.cost,
        target: data.target,
        livingSituation: data.housingType,
        implementationDifficulty: data.implementationDifficulty,
        city: data.city,
        img: newImageUrl,
      };

      await updatePost(updatedPostData, token, post?.id);
      onClose();
      setLoading(false);
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
    <Modal onClose={onClose} isVisable={isVisible}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <h1 className="text-xl font-semibold mb-4">Edit Post</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="text"
            label="Title"
            {...register("title", { required: true })}
            error={errors.title}
          />
          {/* <Input
            type="text"
            label="Who is it good for?"
            {...register("target")}
          /> */}
          <Textarea
            type="text"
            label="Description"
            {...register("description", { required: true })}
            error={errors.description}
          />
          <Input
            type="number"
            label="Cost"
            {...register("cost")}
          />
          <Input
            type="text"
            label="City"
            {...register("city", { required: true })}
            error={errors.city}
          />
          <Select
            {...register("housingType", { required: true })}
            label="Housing Type"
            options={housingOption}
            onChange={handleHousingTypeChange}
            defaultValue={housingOption.find(
              (option) => option.value === post?.livingSituation
            )}
          />
          <Select
            label="Implementation Difficulty"
            {...register("implementationDifficulty", { required: true })}
            options={implementationDifficulty}
            onChange={handleImplementationDifficultyChange}
            defaultValue={implementationDifficulty.find(
              (option) => option.value === post?.implementationDifficulty
            )}
          />
          <input
            type="file"
            {...register("image")}
            onChange={handleImageChange}
          />
          <Button
            type="submit"
            className="bg-[#459858] px-4 rounded-lg text-white h-[40px]"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
