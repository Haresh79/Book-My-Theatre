'use client'
import { QRCodeSVG } from "qrcode.react";

export default function Ticket({ ticket, index }) {
    function formatSeats(seatsArray) {
        if (!seatsArray) {
            return ""; // or return null, depending on your needs
        }
        return seatsArray.join(', ');
    }
    function formatTime(timeString) {
        const parts = timeString.split(':');
        let hours = parseInt(parts[0], 10);
        const minutes = parts[1];
        const seconds = parts[2];
        let period = 'AM';
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) {
                hours -= 12;
            }
        }
        if (hours === 0) {
            hours = 12;
        }
        return `${hours}:${minutes} ${period}`;
    }

    const currentDate = new Date();
    const ticketDate = new Date(`${ticket.date}T${ticket.time}`); 
    const isPastEvent = ticketDate <= currentDate;

    return (
        <div key={index} className="flex w-[230px] flex-col items-center border-[2px] border-dashed rounded-lg  border-gray-500">
            <div className=" h-[250px] flex justify-center items-center overflow-hidden">
                <img src={`${ticket.poster}`} className={`w-[230px] h-full rounded-t-md object-cover ${isPastEvent ? 'grayscale' : ''}`} />
            </div>
            <div className={`bg-[#6750A4] w-full px-2 font-nunito py-4 grid grid-cols-2 text-xs gap-1 items-center rounded-b-md  border-t-2 border-dashed border-gray-500 ${isPastEvent ? 'grayscale' : ''}`}>
                <span className=" row-span-3 text-xs font-lato"><QRCodeSVG value={ticket.id} size={70}/></span>
                <span className="font-nunito">Date: {ticket.date}</span>
                <span className="font-nunito">Time: {formatTime(ticket.time)}</span>
                <span className="font-nunito">Price: {ticket.amount}/-</span>
                <span className="font-nunito col-span-2">Seats: {formatSeats(ticket.seats)}</span>
            </div>
        </div>
    )
}