"use client";

import { useEffect, useState } from "react";
import Homepage from "../components/Homepage/Homepage";
import Landingpage from "../components/Homepage/Landingpage";
import useClearUrl from "../utils/clearUrl";
import cookie from "js-cookie";

export default function Home() {
  const [isAuthed, setIsAuthed] = useState(false); //would be done in a more secure way if it is for real users
  const cookieCheck = cookie.get("user_token");

  useEffect(() => {
    if (cookie.get("user_token") != null) {
      setIsAuthed(true);
    } else {
      setIsAuthed(false);
    }

    console.log(isAuthed);
  }, [cookieCheck]);

  useClearUrl();
  return <div>{isAuthed ? <Homepage /> : <Landingpage />}</div>;
}
