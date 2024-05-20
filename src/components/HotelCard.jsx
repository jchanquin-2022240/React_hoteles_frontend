
import { IF } from '../url'

const HotelCard = ({ hotel }) => {
    return (
        <div >
            <div >
                <img src={IF + hotel.photo} alt="" />
            </div>
            <div >
                <h1 >
                    {hotel.nameHotel}
                </h1>
                <div >
                    <p>Location: {hotel.location}</p>
                    <p>Category: {hotel.category}</p>
                </div>
                <p >{hotel.description.slice(0, 200) + " ...Read more"}</p>
                <div >
                    <p >Installations: {hotel.installations}</p>
                    <p >Status: {hotel.status ? "Open" : "Closed"}</p>
                    <p >Bedrooms: {hotel.bedrooms.length}</p>
                </div>
            </div>
        </div>
    )
}

export default HotelCard
