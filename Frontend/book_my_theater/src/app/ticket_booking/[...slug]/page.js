'use client'

import SeatSelection from "@/components/SeatSelection";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function seats() {
  const params = useParams()
  const slug = params.slug;
  const router = useRouter()
  const jId = slug[0]
  const tPrice = slug[1]
  const [UID, setUID] = useState('')


  console.log(slug[0], slug[1])

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeatsA, setAvailableSeatsA] = useState([]);
  const [availableSeatsB, setAvailableSeatsB] = useState([]);
  const [availableSeatsC, setAvailableSeatsC] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setAvailableSeatsA(generateSeats(10))
    setAvailableSeatsB(generateSeats(10))
    setAvailableSeatsC(generateSeats(10))
  }, [slug[0]])

  const generateSeats = (numSeats) => {
    let seats = [];
    for (let i = 0; i < numSeats; i++) {
      seats.push({ isAvailable: true });
    }
    return seats;
  };

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('UID')) {
      setUID(localStorage.getItem('UID'))
    } else {
      router.push('/login')
    }
    console.log(selectedSeats)
    // setTotalPrice(selectedSeats.length * tPrice); // Example price logic

    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search_by_jatra_id`, { 'jatra_id': jId })
      .then((res) => {
        if (res.data.data[0].ticket_price) {
          setTotalPrice((res.data.data[0].ticket_price) * (selectedSeats.length))
        }
      }).catch((err) => {
        console.log(err)
      })

  }, [selectedSeats]);

  function generatePayment() {
    if (selectedSeats.length > 0) {


      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`, { 'amount': totalPrice })
        .then((res) => {
          if (res.data.id) {
            const options = {
              'key': process.env.NEXT_PUBLIC_YOUR_RAZORPAY_TEST_KEY_ID,
              'amount': res.data.id.amount,
              'currency': res.data.id.currency,
              'name': 'Book My Theatre',
              'description': 'For Ticket Booking',
              'order_id': res.data.id.id,
              'handler': function (response) {
                console.log(response)
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`, {
                  'u_id': UID,
                  'jatra_id': jId,
                  'seats': selectedSeats,
                  'amount': totalPrice,
                  'pay_id': response.razorpay_order_id,
                  'razorpayPaymentId': response.razorpay_payment_id,
                  'razorpaySignature': response.razorpay_signature,
                }).then((res) => {
                  if (res.data) {
                    router.push('/bookings')
                  }
                }).catch((err) => {
                  console.log(err)
                })
              },

            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
          }
        }).catch((err) => {
          console.log(err)
        })


    }
  }

  return (
    <>
      <section className=" flex justify-center items-center gap-5 px-3 py-5">
        <div className="flex justify-center items-center gap-2 flex-wrap"> <div className="w-[40px] h-[40px] bg-[#D9D9D9] rounded-lg"></div> <span>Available</span></div>
        <div className="flex justify-center items-center gap-2 flex-wrap"> <div className="w-[40px] h-[40px] bg-[#6750A4] rounded-lg"></div> <span>Selected</span></div>
        <div className="flex justify-center items-center gap-2 flex-wrap"> <div className="w-[40px] h-[40px] bg-[#6f6f6f] rounded-lg"></div> <span>Taken</span></div>
      </section>

      <section>
        <SeatSelection
          jatraID={jId}
          avilableSeatsA={availableSeatsA}
          avilableSeatsB={availableSeatsB}
          avilableSeatsC={availableSeatsC}
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
        />
      </section>

      <section className="w-full flex justify-center items-center gap-3 p-2">
        <span className="font-semibold text-lg">You Booked {selectedSeats.length} seats total is ₹{totalPrice}  </span>
        <button onClick={generatePayment} className="bg-[#6750A4] rounded-lg px-4 text-lg font-semibold py-0.5">Buy</button>
      </section>

    </>

  )

}