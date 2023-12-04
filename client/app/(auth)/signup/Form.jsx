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
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit(data)} className="flex flex-col w-1/6">
        <input
          {...register("email", { required: true })}
          className="bg-white p-1"
        />
        {errors.email && <p>Email is required.</p>}
        <input
          {...register("Username", { required: true })}
          className="bg-white p-1"
        />
        {errors.Username && <p>Username is required.</p>}
        <input
          {...register("Password", { required: true })}
          className="bg-white p-1"
        />
        {errors.Password && <p>Password is required.</p>}
        <input
          {...register("ConfirmPassword", { required: true })}
          className="bg-white p-1"
        />
        {errors.ConfirmPassword && <p>Confirm Password is required.</p>}
        <input type="submit" />
      </form>
    </div>
  );
}
