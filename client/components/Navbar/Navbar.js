"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <header className="flex items-center">
      <Link href="/" className="flex items-center">
        <Image
          src={"/logo.png"}
          alt="Navbar logo"
          width={64}
          height={64}
          className="mr-10"
        />
        <h1 className="text-xl text-green-1">Bloomin</h1>
      </Link>
      <SearchBar />
      <nav className="flex items-center">
        <a>Home</a>
        <a>Browse</a>
        <a>Form</a>
        {!isLoggedIn && <Link href={"/"}>Signup or SignIn</Link>}
        {isLoggedIn && (
          <div>
            <Link href={"/"}>
              <Image
                src={"/favsIcon.png"}
                width={26}
                height={26}
                alt="Favorites Icon"
              />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
