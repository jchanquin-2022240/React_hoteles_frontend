//import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { Hotel } from "./pages/hotel/Hotel";
import { HotelDetails } from "./pages/hotel/HotelDetails";
import { CreateHotel } from "./pages/hotel/CreateHotel"

const routes = [
    { path: '/auth', element: <AuthPage /> },
    { path: "/", element: <Hotel /> },
    { path: "/hotel", element: <Hotel /> },
    { path: "/create", element: <CreateHotel /> },
    { path: "/hotelDetails", element: <HotelDetails /> }
]

export default routes