'use client'
import Header from "@/components/Header"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function bookings() {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [msg, setMsg] = useState('')

    const router = useRouter()

    function register(e) {
        setIsLoad(true)
        e.preventDefault()
        if (email != '' && pass != '' && phone != '' && confirmPass != '') {
            if (pass == confirmPass) {
                if (phone.length >= 10) {
                    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resgister`, {
                        'email': email,
                        'mobile_no': phone,
                        'password': pass
                    }).then((res) => {
                        if (res.data.userid) {
                            setMsg(res.data.message)
                            setEmail('')
                            setPass('')
                            setPhone('')
                            setConfirmPass('')
                            setIsLoad(false)
                            router.push('/login')
                        }
                    }).catch((err) => {
                        console.log(err)
                        setIsLoad(false)
                    })
                } else {
                    setMsg('Provide a valid contact number.')
                    setIsLoad(false)
                }
            } else {
                setMsg('Password missmatch.')
                setIsLoad(false)
            }
        } else {
            setMsg('Provide all required data.')
            setIsLoad(false)
        }
    }
    return (
        <>
            <Header />
            <section className="flex h-[100vh] flex-col items-center justify-center gap-8">
                <h1 className="text-3xl font-bold font-nunito">Register</h1>
                <form onSubmit={register} className="flex flex-col justify-center items-center gap-6 bg-[#6750A4] p-8 w-[25vw] min-w-[300px] rounded-xl">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="E-mail" required className="bg-[#D9D9D9] px-4 py-2 outline-none rounded-lg text-black font-lato " />
                    <input onChange={(e) => setPhone(e.target.value)} value={phone} type="number" placeholder="Phone" required className="bg-[#D9D9D9] px-4 py-2 outline-none rounded-lg text-black font-lato" />
                    <input onChange={(e) => setPass(e.target.value)} value={pass} type="password" placeholder="Create Password" required className="bg-[#D9D9D9] px-4 py-2 outline-none rounded-lg text-black font-lato" />
                    <input onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} type="text" placeholder="Confirm Password" required className="bg-[#D9D9D9] px-4 py-2 outline-none rounded-lg text-black font-lato" />
                    <button className="bg-[#1E1E1E] py-2 px-4 rounded-full font-medium text-white font-nunito">{isLoad ? (
                        <div className="bouncing-loader">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    ) : ('Sign Up')}</button>
                    <p className="text-sm font-mono text-green-400 text-center">{msg}</p>
                </form>
                <Link href="/login"><span className="font-extralight text-sm font-nunito">Already have an Account / Login</span></Link>
            </section>
        </>
    )
}