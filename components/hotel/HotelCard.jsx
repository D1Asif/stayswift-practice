import Image from "next/image";
import HotelSummaryInfo from "./HotelSummaryInfo";

const HotelCard = ({hotelInfo, checkin, checkout}) => {
  
  return (
    <div className="flex gap-6 border border-gray/20 p-4 rounded-md">
      <Image
        src={hotelInfo?.thumbNailUrl}
        className="max-h-[162px] max-w-[240px]"
        alt={hotelInfo?.name}
        height={165}
        width={240}
      />
      <HotelSummaryInfo fromListPage={true} info={hotelInfo} checkin={checkin} checkout={checkout} />
    </div>
  );
};

export default HotelCard;
