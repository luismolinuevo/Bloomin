"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/app/lib/auth";

export default function AuthWrapper({ children }) {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [userData, setUserData] = useState([]);
  //Check if token exist
  useEffect(() => {
    setToken(cookie.get("user_token"));
    console.log(cookie.get("user_token"));
  }, [cookie.get("user_token")]);

  //If it exist get user with it
  useEffect(() => {
    const getUserData = async () => {
      if (token != null) {
        console.log("Fetching user data...");
        // Call the appropriate function to fetch user data
        try {
          const userData = await getUser(token);
          setUserData(userData); // Update the state with the fetched user data
          console.log(userData)
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle the error if necessary
        }
      } else {
        
      }
    };

    getUserData();
  }, [token]); // Include token in the dependency array

  return <div>{children}</div>;
}
