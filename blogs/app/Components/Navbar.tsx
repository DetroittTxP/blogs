
"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';





export default function Navbar() {
  const [toggleMenu, SettoggleMenu] = useState<boolean>(false);
  const {data:session} = useSession();
  const [IsopenDropdown,SetisOpendropdown] = useState(false);


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a className="w-full" href={`/edit`}>
           Edit Profile
        </a>
      ),
    },
  
  ];
  

  const menuStyles = {
    maxHeight: toggleMenu ? "100vh" : "0",
    overflow: "hidden",
    transition: "max-height 0.5s ease-in-out",
  };

  return (
    <nav className="bg-white shadow-lg p-6 ">
      <div className="flex items-center justify-between px-20 gap-6">
        <div className="font-serif font-bold text-3xl hover:text-4xl transition-all duration-300 ease-in-out">
          <Link href='/'>
          Blogs
          </Link>
 
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
            <>

              <li className="p-3 text-lg text-black">
                 <div className="flex justify-center items-center gap-2">
                  <Dropdown menu={{items}}>
                      <FaRegUserCircle  onClick={() => SetisOpendropdown(!IsopenDropdown)} className=" hover:opacity-40 cursor-pointer" size={32}/>
                  </Dropdown>
    

                 <p className="font-serif text-lg ">{session?.user?.username}</p>
              
                 </div>
            
              </li>
              <li className="p-3">
                 <a className="p-3 font-serif  border rounded-lg bg-red-500 text-white hover:bg-white 
                         hover:text-black cursor-pointer transition duration-300 ease-in-out" onClick={() => signOut()}>SignOut</a>
            </li>

            </>
              

           }
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
