import { AuthPage } from "./pages/auth";
import { Hotel } from "./pages/hotel/Hotel";
import { CreateHotel } from "./pages/hotel/CreateHotel";
import { HabitacionesPage } from "./pages/habitaciones/HabitacionesPage";
import { ReservacionesPage } from "./pages/reservaciones/ReservacionesPage";


const routes = [
    { path: '/auth', element: <AuthPage /> },
    { path: "/", element: <Hotel /> },
    { path: "/hotel", element: <Hotel /> },
    { path: "/create", element: <CreateHotel /> },
    { path: "/hotel/:id", element: <HabitacionesPage /> },
    { path: "/habitacion/:id", element: <ReservacionesPage /> }
]

export default routes