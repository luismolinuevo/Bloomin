"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signup, signin } from "@/app/lib/auth";
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
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userName: formData.userName,
      };
      const response = await signup(data);

      if (response.success) {
        const loginData = {
          userName: formData.userName,
          password: formData.password,
        };
        const login = await signin(loginData);

        if (login.token) {
          cookie.set("user_token", login.token);
          router.push("/");
        }
      }
    } catch (error) {
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
          {errors.userName && <p>Username is required.</p>}
          <input
            {...register("password", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            type="password"
            placeholder="Password"
          />
          {errors.password && <p>Password is required.</p>}
          <input
            {...register("confirmPassword", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <p>Confirm Password is required.</p>}
          <div className="flex justify-center mt-5">
            <input
              type="submit"
              className="py-1 px-2 bg-green-3 text-white w-1/2 rounded-[50px] text-[28px] cursor-pointer"
            />
          </div>
        </form>
        <div className="flex items-center gap-2 my-5">
          <hr className="h-1 border-black w-[100px]" />
          <p>or Sign up with</p>
          <hr className="h-1 border-black w-[100px]" />
        </div>
      </div>
    </div>
  );
}
