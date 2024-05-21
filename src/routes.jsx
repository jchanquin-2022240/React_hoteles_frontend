//import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { Hotel } from "./pages/hotel/Hotel";
import { HotelDetails } from "./pages/hotel/HotelDetails";
import { CreateHotel } from "./pages/hotel/CreateHotel";
import { HabitacionesPage } from "./pages/habitaciones/HabitacionesPage";


const routes = [
    { path: '/auth', element: <AuthPage /> },
    { path: "/", element: <Hotel /> },
    { path: "/hotel", element: <Hotel /> },
    { path: "/create", element: <CreateHotel /> },
    { path: "/hotelDetails/:id", element: <HotelDetails /> },
    { path: "/habitacion", element: <HabitacionesPage /> }
]

export default routes