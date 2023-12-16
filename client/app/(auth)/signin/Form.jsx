"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signin } from "@/app/lib/auth";
import cookie from "js-cookie";

export default function Form() {
  const {
    register,
    data,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      const data = {
        password: formData.password,
        userName: formData.userName
      };
      const response = await signin(data);
      if(response.token) {
        console.log("test");
        cookie.set("user_token", response.token);
        router.push("/");
      }

      console.log("Signin worked");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[350px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("userName", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Username"
          />
          {errors.userName && <p>Username is required.</p>}
          <input
            {...register("password", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Password"
          />
          {errors.password && <p>Password is required.</p>}
          <div className="flex justify-center mt-5">
            <input
              type="submit"
              className="py-1 px-2 bg-green-3 text-white w-1/2 rounded-[50px] text-[28px] cursor-pointer"
            />
          </div>
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
