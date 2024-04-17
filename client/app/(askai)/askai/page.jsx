"use client";

import React, { useState } from "react";
import { askOpenAi } from "@/app/lib/openai";
import cookie from "js-cookie";
import { Input } from "../../utils/MaterialTailwind";

export default function page() {
  const token = cookie.get("user_token");
  const [prompt, setPrompt] = useState("");
  const [tips, setTips] = useState([]);
  const onAsk = async () => {
    try {
      if (token && prompt != "") {
        const data = {
          prompt,
        };
        const askAi = await askOpenAi(data, token);
        console.log(askAi);
        if (askAi.success) {
          setTips(askAi?.result);
        } else {
          console.log("Update to ask ai");
        }
      }
    } catch (error) {
      console.error("There has been a error with ask ai", error);
    }
  };
  return (
    <div className="mx-10 md:mx-20">
      <h1 className="font-bold text-[50px] mb-4">Ask Ai...</h1>
      <form action={onAsk} className="flex">
        <Input
          placeholder="Ask ai for tips?"
          label="Ask ai for tips?"
          className="p-2 sm:h-[60px] text-xl sm:text-[30px]"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#459858] px-8 rounded-lg text-white sm:h-[60px] text-[15px]"
        >
          Submit
        </button>
      </form>

      {/* <p className="text-lg whitespace-pre-line mt-5">{tips}</p> */}
      <div className="mt-5 text-lg">
        Some suggestions for making your home more environmentally conscious are
        - Switching to energy-efficient light bulbs - Installing programmable
        thermostats to reduce energy usage - Using natural cleaning products
        instead of harsh chemicals - Installing low-flow showerheads and faucets
        to conserve water - Properly insulating your home to reduce heating and
        cooling costs - Investing in renewable energy sources such as solar
        panels - Composting kitchen waste for a more sustainable way to dispose
        of food scraps - Planting native species in your yard to attract
        beneficial insects and reduce water usage - Properly disposing of
        hazardous materials to avoid polluting the environment - Conserving
        water by fixing leaks and using drought-resistant landscaping - Using
        reusable bags and containers instead of single-use plastic products -
        Choosing energy-efficient appliances when replacing old ones.
      </div>

      <img
        src={"/AskAiBg.png"}
        alt="Bottom right image"
        className="fixed bottom-0 right-0 w-2/4 lg:w-1/4 h-70 z-[-1] pointer-events-none"
      />
    </div>
  );
}
