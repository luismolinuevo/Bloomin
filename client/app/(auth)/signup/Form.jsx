"use client";

import React from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    data,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex justify-center items-center">
      <div className="w-[350px]">
        <form
          onSubmit={handleSubmit(data)}
          className="flex flex-col gap-7"
        >
          <input
            {...register("email", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Email"
          />
          {errors.email && <p>Email is required.</p>}
          <input
            {...register("Username", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Username"
          />
          {errors.Username && <p>Username is required.</p>}
          <input
            {...register("Password", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Password"
          />
          {errors.Password && <p>Password is required.</p>}
          <input
            {...register("ConfirmPassword", { required: true })}
            className="bg-white p-1 rounded-lg h-[50px]"
            placeholder="Confirm Password"
          />
          {errors.ConfirmPassword && <p>Confirm Password is required.</p>}
          <div className="flex justify-center mt-5">
            <input
              type="submit"
              className="py-1 px-2 bg-green-3 text-white w-1/2 rounded-[50px] text-[28px]"
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
