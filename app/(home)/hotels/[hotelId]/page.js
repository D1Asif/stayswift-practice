import HotelSummaryInfo from '@/components/hotel/HotelSummaryInfo'
import Gallery from '@/components/hotel/details/Gallery'
import Overview from '@/components/hotel/details/Overview'
import { getHotelById } from '@/database/query'

export default async function DetailsPage({params: {hotelId}}) {
    const hotelInfo = await getHotelById(hotelId);
    
    return (
        <>
            <section className="py-4 mt-[100px] ">
                <div className="flex container">
                    <HotelSummaryInfo info={hotelInfo} />
                </div>
            </section>
            <Gallery gallery={hotelInfo?.gallery} />
            <Overview overview={hotelInfo?.overview} />
        </>
    )
}
