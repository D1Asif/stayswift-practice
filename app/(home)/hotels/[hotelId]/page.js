import HotelSummaryInfo from '@/components/hotel/HotelSummaryInfo'
import Gallery from '@/components/hotel/details/Gallery'
import Overview from '@/components/hotel/details/Overview'
import React from 'react'

export default function DetailsPage() {
    return (
        <>
            <section className="py-4 mt-[100px] ">
                <div className="flex container">
                    <HotelSummaryInfo />
                </div>
            </section>
            <Gallery />
            <Overview />
        </>
    )
}
