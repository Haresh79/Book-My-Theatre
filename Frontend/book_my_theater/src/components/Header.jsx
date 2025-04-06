'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
    const [sideNav, setSideNav]= useState(false);
    return (
        <>
            <header className=" sticky top-0 backdrop-blur-xs">
                <nav className="flex justify-between items-center py-3 px-10  bg-transparent mx-15 my-5 rounded-2xl">
                    <Image src='/logo.png' width={150} height={10} alt="Logo" />
                    <div className=" flex gap-10 justify-center align-middl ">
                        <Link id="link" href="/"><span><li className=" font-nunito list-none my-2 bg-[#1b1b1b59] py-1 px-3 rounded-full border-2 border-[#2b2b2b]">Home</li></span></Link>
                        <Link id="link" href="/bookings"><span><li className=" font-nunito list-none my-2 bg-[#1b1b1b59] py-1 px-3 rounded-full border-2 border-[#2b2b2b]">My Tickets</li></span></Link>
                        <Link id="link" href="/login"><span><li className=" font-nunito list-none my-2 bg-[#1b1b1b59] py-1 px-3 rounded-full border-2 border-[#2b2b2b]">Login</li></span></Link>
                        <span id="menu" className="material-symbols-outlined my-2 bg-[#1b1b1b59] py-0.5 px-2 rounded-full border-2 border-[#2b2b2b]" onClick={()=>{
                            setSideNav(true)
                        }}>menu</span>
                    </div>
                </nav>
            </header>
            {sideNav && (
                <div className=" fixed top-0 h-[40vh] w-full bg-[#6750A4] flex flex-col py-10 px-8 justify-start items-end">
                <span className="material-symbols-outlined" onClick={()=>{
                    setSideNav(false)
                }}>close</span>
                <Link href="/"><span><li className=" font-nunito list-none my-2">Home</li></span></Link>
                <Link href="/bookings"><span><li className=" font-nunito list-none my-2">My Tickets</li></span></Link>
                <Link href="/login"><span><li className=" font-nunito list-none my-2">Login</li></span></Link>
               </div>
            )}
        </>
    )
}