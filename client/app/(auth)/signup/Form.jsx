"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signup, signin } from "@/app/lib/auth";
import cookie from "js-cookie";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

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
            {...register("userName", {
              required: true,
              minLength: 3,
              maxLength: 14,
            })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Username"
          />
          {errors.userName?.type === "required" && <p>Username is required.</p>}
          {errors.userName?.type === "minLength" && (
            <p>Username must be at least 3 characters long.</p>
          )}
          {errors.userName?.type === "maxLength" && (
            <p>Username must not exceed 14 characters.</p>
          )}
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 30,
            })}
            className="bg-white p-1 rounded-lg h-[50px]"
            type="password"
            placeholder="Password"
          />
          {errors.password?.type === "required" && <p>Password is required.</p>}
          {errors.password?.type === "minLength" && (
            <p>Password must be at least 8 characters long.</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p>Password must not exceed 30 characters.</p>
          )}
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === password,
            })}
            className="bg-white p-1 rounded-lg h-[50px]"
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword?.type === "required" && (
            <p>Confirm Password is required.</p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p>Passwords do not match.</p>
          )}

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
