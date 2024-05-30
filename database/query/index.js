import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model"
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { isDateInBetween, replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";

export const getAllHotels = async (destination, checkin, checkout) => {
    let allHotels = await hotelModel.find().lean();

    if (destination) {
        allHotels = allHotels.filter(hotel => hotel.city === destination);
    }

    if (checkin && checkout) {
        allHotels = await Promise.all(
            allHotels.map(async (hotel) => {
                const booked = await isHotelBooked(hotel._id, checkin, checkout);
                if (booked) {
                    hotel.isBooked = true;
                } else {
                    hotel.isBooked = false;
                }
                return hotel;
            })
        )
    }

    return replaceMongoIdInArray(allHotels);
}

export const getHotelById = async (hotelId, checkin, checkout) => {
    const hotel = await hotelModel.findById(hotelId).lean();

    if (checkin && checkout) {
        const booked = await isHotelBooked(hotel._id, checkin, checkout);
        
        if (booked) {
            hotel.isBooked = true;
        } else {
            hotel.isBooked = false;
        }
    }

    return replaceMongoIdInObject(hotel);
}

export const isHotelBooked = async (hotelId, checkin, checkout) => {
    const matches = await bookingModel
        .find({ hotelId: hotelId.toString() })
        .lean();

    const found = matches.find((match) => {
        return (
            (isDateInBetween(match?.checkin, checkin, checkout) || isDateInBetween(match?.checkout, checkin, checkout)) || (isDateInBetween(checkin, match?.checkin, match?.checkout) && isDateInBetween(checkout, match.checkin, match?.checkout))
        )
    })

    return found;
}

export const getRatingsOfAHotel = async (hotelId) => {
    const ratings = await ratingModel.find({ hotelId: hotelId }).lean();

    return replaceMongoIdInArray(ratings);
}

export const getReviewsOfAHotel = async (hotelId) => {
    const reviews = await reviewModel.find({ hotelId: hotelId }).lean();

    return replaceMongoIdInArray(reviews);
}