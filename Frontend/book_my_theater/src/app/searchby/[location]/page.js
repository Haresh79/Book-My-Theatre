'use client'
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Loading from "./loading"


export default function locations() {
    const params = useParams()
    const location = decodeURIComponent(params.location)
    const [data, setData] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [msg, setMsg]= useState('')
    useEffect(() => {
        setIsLoad(true)
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search`, { 'search': location })
            .then((res) => {
                console.log(res.data)
                if (res.data.data) {
                    setData(res.data.data.reverse())
                    setIsLoad(false)
                    console.log(res.data.data)
                }
                else {
                    setIsLoad(true)
                    setMsg(res.data.message)
                }
            }).catch((err) => {
                console.log(err)
                setIsLoad(false)
            })
    }, [location])
    return (
        <>
            <header className=" mx-15 my-8">
                <span className=" hover:text-[#6750A4] font-lato hover:font-nunito"><Link href='/'>Home / </Link></span><span className=" text-[#6750A4]">{location}</span>
            </header>
            <section className="w-full flex justify-center items-center flex-wrap gap-15">
                {data.length > 0 ? (
                    data.map((jatra, index) => (
                        <Suspense key={index} fallback={<Loading />}>
                            <Link href={`/jatra/${jatra.id}`} className="w-fit">
                                <div className=" bg-[#D9D9D9] h-[280px] w-[200px] flex flex-col justify-end rounded-xl bg-cover bg-center"
                                    style={{ backgroundImage: `url(${jatra.poster})` }}>
                                    <div className=" flex flex-col bg-gray-800 w-full p-2 rounded-lg">
                                        <h1 className=" font-bold text-sm font-lato">{jatra.title}</h1>
                                        <h3 className=" text-sm font-light font-nunito">{jatra.party_name}</h3>
                                        <span className="text-[10px] font-light font-lato">{jatra.date}</span><span className="flex w-full justify-end"><button className="bg-[#6750A4] text-sm rounded-md px-2 py-0.5 font-nunito">₹{jatra.ticket_price}</button></span>
                                    </div>
                                </div>
                            </Link>
                        </Suspense>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        {msg!=''?(
                            <h1 className="font-nunito mt-5 text-lg">No shows are available in this location.</h1>
                        ):(
                            <Loading />
                        )}
                        
                        
                    </div>
                    
                    
                )
                }
            </section>
        </>
    )
}