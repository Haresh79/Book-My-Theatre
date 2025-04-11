'use client'
import Ticket from "@/components/Ticket";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";


export default function Bookings() {
    const [allTickets, setAllTickets] = useState([])
    const [uId, setUId] = useState('')
    const router = useRouter()
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if (localStorage.getItem('UID')) {
            setUId(localStorage.getItem('UID'))
            console.log(localStorage.getItem('UID'))
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all_booking/user_id`, { 'user_id': uId })
                .then((res) => {
                    if (res.data.data) {
                        console.log(res.data.data)
                        setAllTickets(res.data.data.reverse())
                    } else {
                        setMsg('You don\'t have any tickets')
                    }
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            router.push('/login')
        }
    })
    return (
        <>
            <section className=" mx-15 my-8" id="top">
                <span className=" hover:text-[#6750A4] font-lato hover:font-nunito"><Link href='/'>Home / </Link></span><span className=" text-[#6750A4]">All Bookings</span>
            </section>
            <section className="p-5 flex w-full justify-center items-start gap-10 flex-wrap">
                {allTickets.length > 0 ? (
                    allTickets.map((ticket, index) => (
                        <Ticket key={index} ticket={ticket} index={index} />
                    ))
                ) : (
                    <div>
                        {msg != '' ? (
                            <h1>{msg}</h1>
                        ): (
                                <Loading/>
                        )}
                    </div>

                )
                }
            </section>
            <div className="w-fit h-fit rounded-sm fixed right-4 bottom-10 py-2 px-4 bg-[#6750A4]" href="#top">^</div>
        </>
    )
}