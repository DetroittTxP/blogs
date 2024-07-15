"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [toggleMenu, SettoggleMenu] = useState<boolean>(false);
  const {data:session} = useSession();

  

  const menuStyles = {
    maxHeight: toggleMenu ? "100vh" : "0",
    overflow: "hidden",
    transition: "max-height 0.5s ease-in-out",
  };

  return (
    <nav className="bg-white shadow-lg p-6 ">
      <div className="flex items-center justify-between px-20 gap-6">
        <div className="font-serif font-bold text-3xl hover:text-4xl">
          Blogs
        </div>

        <div className="hidden md:flex relative">
          <FaSearch
            className="absolute top-2.5 left-3 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search..."
            className="md:w-96 hover:border-black hover:border-2 pl-10 pr-3 py-2 rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            style={{ transition: "all 0.3s ease" }}
          />
        </div>

        <div className="bg-black text-white p-2 rounded-lg hover:text-black hover:bg-white cursor-pointer md:hidden">
          <button onClick={() => SettoggleMenu(!toggleMenu)}>MENU</button>
        </div>

        <div>
          <ul className="hidden md:flex gap-6 text-lg">
            { !session ? <>
              <Link href="/login" className="p-3 hover:text-gray-500 cursor-pointer">Login</Link>
            <li className="p-3 border rounded-lg bg-black text-white hover:bg-white 
                         hover:text-black cursor-pointer transition duration-300 ease-in-out">
              <Link href="/register">Sign Up</Link>
            </li>

            </>
            :
            <li className="p-3 border rounded-lg bg-red-500 text-white hover:bg-white 
                         hover:text-black cursor-pointer transition duration-300 ease-in-out">
                 <a onClick={() => signOut()}>SignOut</a>
            </li>}
          </ul>
        </div>
      </div>

      <div style={menuStyles} className="md:hidden">
        <div className="mt-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-full hover:border-black hover:border-2 pl-10 pr-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            style={{ transition: "all 0.3s ease" }}
          />
        </div>

        <ul className="flex flex-col gap-6 text-lg">
          <li className="p-3 hover:text-gray-500 cursor-pointer">Login</li>
          <li className="p-3 border rounded-lg bg-black text-white hover:bg-white hover:text-black 
          cursor-pointer transition duration-300 ease-in-out">
            <Link href="/register">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
