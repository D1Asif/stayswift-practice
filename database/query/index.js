import { hotelModel } from "@/models/hotel-model"
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";

export const getAllHotels = async () => {
    const allHotels = await hotelModel.find().lean();

    return replaceMongoIdInArray(allHotels);
}

export const getHotelById = async (hotelId) => {
    const hotel = await hotelModel.findById(hotelId).lean();

    return replaceMongoIdInObject(hotel);
}

export const getRatingsOfAHotel = async (hotelId) => {
    const ratings = await ratingModel.find({hotelId: hotelId}).lean();

    return replaceMongoIdInArray(ratings);
}

export const getReviewsOfAHotel = async (hotelId) => {
    const reviews = await reviewModel.find({hotelId: hotelId}).lean();

    return replaceMongoIdInArray(reviews);
}