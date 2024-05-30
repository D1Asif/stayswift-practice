import Link from "next/link";
import HotelRating from "./HotelRating";
import HotelReview from "./HotelReview";

const HotelSummaryInfo = async ({ fromListPage, info }) => {

  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2 className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl"}>
          {info?.name}
        </h2>
        <p>📍 {info?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <HotelRating hotelId={info?.id} />
          <HotelReview hotelId={info?.id} />
        </div>
        <span className="bg-yellow-400 p-1 rounded-md">{info?.propertyCategory} star Hotel</span>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">${(info?.highRate + info?.lowRate) / 2}/night</h2>
        <p className=" text-right">Per Night for 1 Room</p>
        {
          fromListPage ? (
            <Link href={`hotels/${info?.id}`} className="btn-primary ">Details</Link>
          ) : (
            <Link href={`/hotels/${info?.id}/payment`} className="btn-primary ">Book</Link>
          )
        }
      </div>
    </>
  );
};

export default HotelSummaryInfo;
