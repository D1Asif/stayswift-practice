
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import Logout from "./auth/Logout";

const Navbar = async ({ fromAuth }) => {
  const session = await auth();
  console.log(session?.user);
  return (
    <nav>
      <Link href="/">
        <Image
          src="/stayswift.svg"
          alt="Stay Swift Logo"
          width={200}
          height={200} />
      </Link>

      {
        !fromAuth && (
          <ul>
            <li>
              <Link href="#">Recommended Places</Link>
            </li>

            <li>
              <Link href="#">About Us</Link>
            </li>

            <li>
              <Link href="#">Contact us</Link>
            </li>

            <li>
              <Link href="/bookings">Bookings</Link>
            </li>

            <li>
              {
                session?.user ? (
                  <div>
                    <span>{session?.user.name}</span>
                    <span className="mx-1">|</span>
                    <Logout />
                  </div>
                ) : (
                  <Link href="/login" className="login">Login</Link>
                )
              }
            </li>
          </ul>
        )
      }
    </nav >
  )
}

export default Navbar