import { getReviewsOfAHotel } from "@/database/query";

export default async function HotelReview({hotelId}) {
    const reviews = await getReviewsOfAHotel(hotelId);

    return (
        <span>{reviews?.length} Reviews</span>
    )
}
