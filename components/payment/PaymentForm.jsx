"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentForm = ({ checkin, checkout, loggedInUser, hotelInfo, cost }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/auth/payment", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({
          userId: loggedInUser?.id,
          hotelId: hotelInfo?.id,
          checkin,
          checkout
        })
      });

      if (res.status === 201) {
        router.push("/bookings");
      } else {
        throw new Error(`Error: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <form className="my-8" onSubmit={onSubmit}>
        <div className="my-4 space-y-2">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
            value={loggedInUser?.name}
          />
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
            value={loggedInUser?.email}
          />
        </div>

        <div className="my-4 space-y-2">
          <span>Check in</span>
          <h4 className="mt-2">
            <input type="date" name="checkin" id="checkin" value={checkin} />
          </h4>
        </div>

        <div className="my-4 space-y-2">
          <span>Checkout</span>
          <h4 className="mt-2">
            <input type="date" name="checkout" id="checkout" value={checkout} />
          </h4>
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="card" className="block">
            Card Number
          </label>
          <input
            type="text"
            id="card"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
          />
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="expiry" className="block">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiry"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
          />
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="cvv" className="block">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Pay Now (${cost})
        </button>
      </form>
    </>
  );
};

export default PaymentForm;
