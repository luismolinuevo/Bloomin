import React from "react";
import Form from "./Form";

export default function index() {
  return (
    <div className="h-screen w-full bg-[#E5EBE1] flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-[38px] mb-12 text-bold">Sign Up</h1>
        <Form />
      </div>
    </div>
  );
}
//need layout to have navbar on top
