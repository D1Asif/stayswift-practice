import { auth } from "@/auth";
import PaymentForm from "@/components/payment/PaymentForm";
import { getHotelById, getUserByEmail } from "@/database/query";
import { getDayDifference } from "@/utils/data-utils";
import { redirect } from "next/navigation";


export default async function PaymentPage({params: {hotelId}, searchParams: {checkin, checkout}}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const loggedInUser =  await getUserByEmail(session?.user?.email);
    const hotelInfo = await getHotelById(hotelId, checkin, checkout);

    const days = getDayDifference(checkin, checkout);
    const cost = (hotelInfo?.highRate + hotelInfo?.lowRate) / 2 * days;

    return (
        <section className="container">
            <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
                <h2 className="font-bold text-2xl">Payment Details</h2>
                <p className="text-gray-600 text-sm">You have picked <b>{hotelInfo?.name}</b> and total price is <b>${cost}</b> for <b>{days} days</b>
                </p>
                <PaymentForm
                    checkin={checkin}
                    checkout={checkout}
                    loggedInUser={loggedInUser}
                    hotelInfo={hotelInfo}
                    cost={cost}
                />
            </div>
        </section>
    )
}
