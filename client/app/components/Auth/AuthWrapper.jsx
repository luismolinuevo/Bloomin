"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { getUser } from "@/app/lib/auth";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [token, setToken] = useState(null); // Initialize with null
  const [userData, setUserData] = useState(null); // Initialize with null

  useEffect(() => {
    const tokenFromCookie = cookie.get("user_token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        try {
          console.log("Fetching user data...");
          const userData = await getUser(token);
          if (userData.success) {
            setUserData(userData);
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push("/");
        }
      }
    };

    getUserData();
  }, [token]); // Trigger the effect when the token changes

  return <div>{children}</div>;
}
