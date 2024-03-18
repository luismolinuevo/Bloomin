"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { getUser } from "@/app/lib/auth";
import { useAppDispatch } from "@/app/store/reduxhooks";
import { setIsLoggedIn, setUserData } from "@/app/store/slices/auth";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState(null); // Initialize with null
  //   const [userData, setUser] = useState(null); // Initialize with null

  useEffect(() => {
    const tokenFromCookie = cookie.get("user_token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (token != null) {
        try {
          console.log("Fetching user data...");
          const userData = await getUser(token);
          if (userData.success) {
            // setUser(userData);
            dispatch(setIsLoggedIn(true));
            dispatch(setUserData(userData.data));
          } else {
            dispatch(setIsLoggedIn(null));
            router.push("/");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          //   router.push("/");
        }
      }
    };

    getUserData();
  }, [token]); // Trigger the effect when the token changes

  return <div>{children}</div>;
}

export default AuthWrapper;
