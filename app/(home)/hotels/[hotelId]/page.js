import HotelSummaryInfo from '@/components/hotel/HotelSummaryInfo'
import Gallery from '@/components/hotel/details/Gallery'
import Overview from '@/components/hotel/details/Overview'
import { getHotelById } from '@/database/query'

export default async function DetailsPage({params: {hotelId}, searchParams: {checkin, checkout}}) {
    const hotelInfo = await getHotelById(hotelId, checkin, checkout);
    
    return (
        <>
            <section className="py-4 mt-[100px] ">
                <div className="flex container">
                    <HotelSummaryInfo info={hotelInfo} checkin={checkin} checkout={checkout} />
                </div>
            </section>
            <Gallery gallery={hotelInfo?.gallery} />
            <Overview overview={hotelInfo?.overview} />
        </>
    )
}
