import React from "react";
import Form from "./Form";
import Google from "@/app/components/Auth/Google";

export default function page() {
  return (
    <div className="h-screen w-full bg-[#E5EBE1] flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-[38px] mb-12 text-bold">Sign In</h1>
        <Form />
        <Google />
      </div>
    </div>
  );
}
