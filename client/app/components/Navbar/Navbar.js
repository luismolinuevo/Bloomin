"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { MenuIcon } from "@heroicons/react/outline";
import cookie from "js-cookie";
import { useAppSelector } from "@/app/store/reduxhooks";
import { ProfileMenu } from "./ProfileMenu";

export default function Navbar() {
  const token = cookie.get("user_token");
  const userData = useAppSelector((state) => state.auth.userData);
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check if token exists
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="block">
      <header
        className={`w-full px-[50px] py-7 md:px-[80px] text-center fixed z-10 ${
          openNav
            ? "bg-main h-screen"
            : isScrolled
            ? "bg-gray-800 bg-opacity-80"
            : ""
        }`}
        style={{ position: isScrolled ? "sticky" : "static", top: 0 }}
      >
        <nav className="flex justify-between">
          <Link
            href={"/"}
            className={`cursor-pointer pr-4 flex items-center ${
              openNav && "hidden"
            }`}
          >
            <Image
              src={"/logo.png"}
              alt="Navbar logo"
              width={64}
              height={64}
              className="mr-8"
            />
            <h1 className="text-xl text-green-1 hidden lg:block">Bloomin</h1>
          </Link>
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <div
            className={`${
              openNav ? "h-screen w-full flex justify-center items-center" : ""
            } `}
          >
            <div
              className={`lg:flex gap-6 md:text-[23px] md:items-center ${
                openNav
                  ? "flex flex-col text-center text-[20px] text-black"
                  : "hidden"
              } ${isScrolled ? "text-white" : ""}`}
            >
              <div className={`${openNav ? "flex justify-center" : "hidden"}`}>
                <SearchBar />
              </div>
              {!isLoggedIn && <Link href={"/"}>Home</Link>}
              <Link href={"/askai"}>Askai</Link>
              <Link href={"/posts"}>Browse</Link>
              {!isLoggedIn && <Link href={"/signin"}>Sign in</Link>}
              {isLoggedIn && (
                <>
                  <div>
                    <Link href={`/profile/${userData?.id}`}>Profile</Link>
                  </div>
                  <div>
                    <ProfileMenu />
                  </div>
                </>
              )}
            </div>
          </div>
          <button
            className={`lg:hidden ${openNav ? "hidden" : ""}`}
            onClick={() => setOpenNav(!openNav)}
          >
            <MenuIcon className={`h-8 w-8 text-black`} />
          </button>
          {openNav ? (
            <div className="absolute top-0 right-0 pr-8">
              <button
                className={`text-[25px] pt-6`}
                onClick={() => setOpenNav(!openNav)}
              >
                X
              </button>
            </div>
          ) : (
            ""
          )}
        </nav>
      </header>
    </div>
  );
}
