"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { MenuIcon } from "@heroicons/react/outline";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [openHamburger, setOpenHamburger] = useState(false);

//   return (
//     <header className="block">
//       <div className="lg:px-20 lg:py-5 px-10 py-2 w-full fixed z-10">
//         <nav className="flex items-center justify-between">
//           <Link href="/" className="flex items-center">
//             <Image
//               src={"/logo.png"}
//               alt="Navbar logo"
//               width={64}
//               height={64}
//               className="mr-8"
//             />
//             <h1 className="text-xl text-green-1 hidden lg:block">Bloomin</h1>
//           </Link>
//           <SearchBar />
//           <div className="text-xl lg:flex lg:items-center lg:gap-6">
//             <Link href={"/"}>Home</Link>
//             <Link href={"/"}>Browse</Link>
//             <Link href={"/"}>Form</Link>
//             {!isLoggedIn && <Link href={"/"}>Signup or SignIn</Link>}
//             {isLoggedIn && (
//               <div>
//                 <Link href={"/"}>
//                   <Image
//                     src={"/favsIcon.png"}
//                     width={26}
//                     height={26}
//                     alt="Favorites Icon"
//                   />
//                 </Link>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => setOpenHamburger(!openHamburger)}
//             className={`lg:hidden ${openHamburger ? 'hidden' : ''}`}
//           >
//             <MenuIcon className={`h-8 w-8 text-black`} />
//           </button>
//         </nav>
//         {openHamburger && (
//           <div className="lg:hidden text-xl flex flex-col items-center">
//             <Link href={"/"}>Home</Link>
//             <Link href={"/"}>Browse</Link>
//             <Link href={"/"}>Form</Link>
//             {!isLoggedIn && <Link href={"/"}>Signup or SignIn</Link>}
//             {isLoggedIn && (
//               <div>
//                 <Link href={"/"}>
//                   <Image
//                     src={"/favsIcon.png"}
//                     width={26}
//                     height={26}
//                     alt="Favorites Icon"
//                   />
//                 </Link>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
        id="top"
      >
        <nav className="flex justify-between">
          <Link
            href={"/"}
            className={`cursor-pointer pr-4 flex items-center ${openNav && "hidden"}`}
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
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Browse</Link>
              <Link href={"/"}>Form</Link>
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
