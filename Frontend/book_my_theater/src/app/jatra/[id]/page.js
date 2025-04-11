'use client'
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "./loading"

export default function Jatra() {
    const params = useParams()
    const id = params.id
    const [data, setData] = useState()

    useEffect(() => {
        console.log(data)
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search_by_jatra_id`, { 'jatra_id': id })
            .then((res) => {
                if (res.data.data) {
                    setData(res.data.data[0])
                }
            }).catch((err) => {
                console.log(err)
            })
    }, [id])

    return (
        <>
            {data != null ? (
                <section className="h-[100vh] flex justify-center items-center flex-wrap gap-10">
                    <div className="w-[230px] h-[300px] drop-shadow-lg">
                        <img src={`${data.poster}`} className="w-full h-full rounded-xl object-cover" />
                    </div>
                    <div className=" flex flex-col gap-4">
                        <div>
                            <h1 className="text-2xl font-bold font-nunito">{data.title}</h1>
                            <h2 className="text-sm font-light font-nunito">{data.party_name}</h2>
                        </div>
                        <div>
                            <pre className="text-sm font-bold font-nunito">
                                {`${data.description}`}
                            </pre>
                        </div>
                        <div className="flex flex-col text-sm font-light font-lato">
                            <span>Location : {data.place}, {data.city}</span>
                            <span>Date Time : {data.date} | {data.time}</span>
                        </div>
                        <div>
                            <Link href={`/ticket_booking/${id}/${data.ticket_price}`}><button className="bg-[#6750A4] rounded-lg px-5 cursor-pointer py-1 font-semibold font-lato">₹{data.ticket_price} Book</button></Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="h-[100vh] flex justify-center items-center flex-wrap gap-10">
                    <Loading />    
                </section>
            )}
        </>
    )
}