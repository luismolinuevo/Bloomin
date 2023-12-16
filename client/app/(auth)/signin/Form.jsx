"use client";

import React from "react";
import { useForm } from "react-hook-form";
// import { signin } from "@/app/lib/auth";

export default function Form() {
  const {
    register,
    data,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      // Call the signup function with form data
      console.log(formData)
      const data = {
        email: formData.email,
        password: formData.password,
      }
    //   await signin(data);

      // Handle successful signup response
      console.log("Signup success:");
    } catch (error) {
      // Handle error during signup
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[350px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("email", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Email"
          />
          {errors.email && <p>Email is required.</p>}
          <input
            {...register("userName", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Username"
          />
          {errors.password && <p>Password is required.</p>}
        </form>
        <div className="flex items-center gap-2 my-5">
          <hr className="h-1 border-black w-[100px]" />
          <p>or Sign in with</p>
          <hr className="h-1 border-black w-[100px]" />
        </div>
      </div>
    </div>
  );
}
