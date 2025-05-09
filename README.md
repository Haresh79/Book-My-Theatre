# Book My Theatre - Odia Jatra Ticket Booking System

This is a full-stack web application for booking Odia Jatra tickets. It allows users to book tickets for various Jatras, view Jatra details, and make payments online. The system has three main modules:

- **Admin**: Admin can manage all bookings, view Jatra details, and remove Jatras.
  
- **Client**: Clients can search for Jatras by location, book tickets, and receive digital tickets after payment.
- - <a href="https://book-my-theatre-3w99z269p-haresh-s-projects-09240394.vercel.app/">https://book-my-theatre-3w99z269p-haresh-s-projects-09240394.vercel.app/</a>

- **Jatra Troupes**: Jatra troupes can register, upload details of their upcoming Jatras, and manage offline bookings.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: Supabase
- **Payment Gateway**: Razorpay

## Features

### 1. Admin Module
- View all ticket bookings
- Manage Jatra information
- Remove Jatra entries

### 2. Client Module
- Search Jatras by location
- View Jatra details
- Book tickets for available Jatras
- Receive digital tickets after successful payment

### 3. Jatra Troupe Module
- Login/Signup Authentication
- Upload upcoming Jatra information
- Manage offline bookings

## Project Setup

### Prerequisites
- Node.js (version 14.x or higher)
- npm (Node package manager)
- Supabase account for the database
- Razorpay account for payment gateway

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/Haresh79/book-my-theatre.git
cd book-my-theatre/backend
npm install
npm start
```

### Frontend Setup
1. Admin repository:
  ```bash
cd book-my-theatre/frontend/admin_app
npm install
npm run dev
```
2. BookMyTheatre repository:
```bash
cd book-my-theatre/frontend/book_my_theater
npm install
npm run dev
```
3. Jatra Partner repository:
 ```bash
cd book-my-theatre/frontend/jatra_partner
npm install
npm run dev
```

### Key Points:
- The setup instructions are divided for both frontend and backend.
- Environment variable placeholders are included for Supabase and Razorpay configuration.
- Clear instructions on how each module (Admin, Client, Jatra Troupes) works and integrates.
- Example of how the folder structure should look for better clarity.
