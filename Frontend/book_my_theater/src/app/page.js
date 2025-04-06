'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router=useRouter()
  const [location, setLoaction] = useState('');
  const [imgSrc, setImgSrc] = useState('/banner1.jpg')
  const images=['/banner1.jpg', '/banner2.jpg', '/banner3.jpg']
  let [rear, setRear]=useState(0)
  useEffect(()=>{
    const intervalId = setInterval(() => {
      setRear((prevRear) => { // Use functional update
        const newRear = (prevRear + 1) % images.length;
        setImgSrc(images[newRear]);
        return newRear;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images])
  
  return (
    <>
      <Header />
      <div className=" backdrop-blur-lg transition-colors animate-gradient -z-10 absolute top-0.5 w-1/2 h-4/5 bg-radial from-[#431ddd4e] to-transparent to-60% rounded-full"></div>
      <section className="flex flex-col items-center mt-15">
        <div className="bg-[#D9D9D9] border-2 border-[#431dddc6] w-fit p-2 rounded-full flex justify-between items-center gap-5">
          <span className="material-symbols-outlined text-black text-xl">search</span>
          <input type="search" className="w-[30vw] font-lato min-w-[200px] outline-none text-black" placeholder="Search by your location..." value={location} onChange={(e) => { setLoaction(e.target.value) }} onKeyDown={(e)=>{ if (e.key==='Enter') {
            router.push(`/searchby/${location}`)
          }}} />
          <Link href={`/searchby/${location}`}><button className="bg-[#6750A4] px-2 py-0.5 rounded-full font-bold">GO</button></Link>
        </div>
        <p className=" text-2xl font-nunito text-lin font-bold my-5 px-10 text-center" style={{
          backgroundImage: "linear-gradient(to left, #ff0000, #0000ff)", // Example gradient colors
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
        }}>
          Search by city location and select a Jatra to book tickets
        </p>
      </section>
      <section className=" mx-5 my-8 flex flex-col justify-center items-center">
        <h1 className="text-[28px] font-semibold font-nunito">Popular Locations</h1>
        <div className="grid grid-cols-3 gap-3 mt-6 text-sm">
          <Link href="/searchby/balasore"><li className="list-none font-lato hover:text-[#6750A4]">Balasore</li></Link>
          <Link href="/searchby/cuttack"><li className="list-none font-lato hover:text-[#6750A4]">Cuttack</li></Link>
          <Link href="/searchby/puri"><li className="list-none font-lato hover:text-[#6750A4]">Puri</li></Link>
          <Link href="/searchby/rourkela"><li className="list-none font-lato hover:text-[#6750A4]">Rourkela</li></Link>
          <Link href="/searchby/berhampur"><li className="list-none font-lato hover:text-[#6750A4]">Berhampur</li></Link>
          <Link href="/searchby/sambalpur"><li className="list-none font-lato hover:text-[#6750A4]">Sambalpur</li></Link>
          <Link href="/searchby/rayagada"><li className="list-none font-lato hover:text-[#6750A4]">Rayagada</li></Link>
          <Link href="/searchby/bhadrak"><li className="list-none font-lato hover:text-[#6750A4]">Bhadrak</li></Link>
          <Link href="/searchby/baripada"><li className="list-none font-lato hover:text-[#6750A4]">Baripada</li></Link>
          <Link href="/searchby/anugul"><li className="list-none font-lato hover:text-[#6750A4]">Anugul</li></Link>
          <Link href="/searchby/jharsuguda"><li className="list-none font-lato hover:text-[#6750A4]">Jharsuguda</li></Link>
          <Link href="/searchby/paradeep"><li className="list-none font-lato hover:text-[#6750A4]">Paradip</li></Link>
          <Link href="/searchby/koraput"><li className="list-none font-lato hover:text-[#6750A4]">Koraput</li></Link>
          <Link href="/searchby/dhenkanal"><li className="list-none font-lato hover:text-[#6750A4]">Dhenkanal</li></Link>
          <Link href="/searchby/kendujhar"><li className="list-none font-lato hover:text-[#6750A4]">Kendujhar</li></Link>
          <Link href="/searchby/kendrapara"><li className="list-none font-lato hover:text-[#6750A4]">Kendrapara</li></Link>
          <Link href="/searchby/bolangir"><li className="list-none font-lato hover:text-[#6750A4]">Bolangir</li></Link>
          <Link href="/searchby/bhubaneswar"><li className="list-none font-lato hover:text-[#6750A4]">Bhubaneswar</li></Link>
        </div>
      </section>
      <section  className=" w-full flex justify-center items-center my-4">
        <div className="w-[100%] max-w-[1000px] max-h-[600px] overflow-hidden">
          <img src={`${imgSrc}`} className={`carousel-image transition-all rounded-xl`} style={{width:'100%', height:'auto', display:'block', objectFit: 'contain'}}/>
        </div>
      </section>
      <Footer />
    </>
  );
}
