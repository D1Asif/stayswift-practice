"use client"

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

const SocialLogins = ({ fromLogin }) => {
  const router = useRouter();
  const handleLogin = async (providerName) => {
    signIn(providerName, {
      callbackUrl: "/bookings"
    });
  }

  return (
    <>
      <div className="text-center text-xs text-gray-500">
        <Link href={fromLogin ? "/register" : "/login"} className="underline">
          {fromLogin ? "Register" : "Login"}
        </Link>
        &nbsp; or Signup with
      </div>
      <div className="flex gap-4">
        <button className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center">
          <Image src="/fb.png" alt="facebook" width={30} height={30} />
          <span onClick={() => handleLogin("facebook")}>Facebook</span>
        </button>
        <button className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center">
          <Image src="/google.png" alt="google" width={30} height={30} />
          <span onClick={() => handleLogin("google")}>Google</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogins;
