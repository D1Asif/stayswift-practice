import { getAllHotels } from "@/database/query";
import HotelCard from "./HotelCard";
import NoHotels from "./NoHotels";

const HotelList = async () => {
  const allHotels = await getAllHotels();
  
  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {
          allHotels?.length > 0 ? (
            allHotels.map((hotel) => (
              <HotelCard key={hotel?.id} hotelInfo={hotel} />
            ))
          ) : (
            <NoHotels />
          )
        }

      </div>
    </div>
  );
};

export default HotelList;
