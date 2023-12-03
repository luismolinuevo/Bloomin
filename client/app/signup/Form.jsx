"use client"

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
    <form onSubmit={handleSubmit(data)}>
      <label >Email</label>
      <input {...register("email", { required: true })} className="border"/>
      {errors.email && <p>Email is required.</p>}
      <input {...register("Username", { required: true })} />
      {errors.Username && <p>Username is required.</p>}
      <input {...register("Password", { required: true })} />
      {errors.Password && <p>Password is required.</p>}
      <input {...register("ConfirmPassword", { required: true })} />
      {errors.ConfirmPassword && <p>Confirm Password is required.</p>}
    </form>
  );
  
}
