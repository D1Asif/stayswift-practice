import { getRatingsOfAHotel } from "@/database/query";

export default async function HotelRating({hotelId}) {
    const ratings = await getRatingsOfAHotel(hotelId);

    const getRatingDescription = (avgRating) => {
        if (avgRating === 0) {
            return "No Ratings Available";
          } else if (avgRating > 0 && avgRating <= 2) {
            return "Poor";
          } else if (avgRating > 2 && avgRating <= 3) {
            return "Average";
          } else if (avgRating > 3 && avgRating <= 4) {
            return "Good";
          } else if (avgRating > 4) {
            return "Very Good";
          }
    }

    let averageRating = 0;

    if (ratings.length === 1) {
        averageRating = ratings[0].rating;
    }

    if (ratings.length > 1) {
        averageRating = ((ratings.reduce((prev, curr) => prev.rating + curr.rating)) / ratings.length);
    }

    return (
        <>
            <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
                {averageRating}
            </div>
            <span className="font-medium">{getRatingDescription(averageRating)}</span>
        </>
    )
}
