"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({
          fname: formData.get("fname"),
          lname: formData.get("lname"),
          email: formData.get("email"),
          password: formData.get("password")
        })
      });

      if (res.status === 201) {
        router.push("/login")
      } else {
        throw new Error(`Error: ${res.status}`)
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="fname">First Name</label>
          <input type="text" name="fname" id="fname" />
        </div>

        <div>
          <label htmlFor="lname">Last Name</label>
          <input type="text" name="lname" id="lname" />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit" className="btn-primary w-full mt-4">
          Create account
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
