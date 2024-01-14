"use client"

import Landingpage from "../components/Homepage/Landingpage";
import useClearUrl from "../utils/clearUrl";

export default function Home() {
  useClearUrl();
  return <div><Landingpage/></div>;
}
