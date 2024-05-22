import { AuthPage } from "./pages/auth";
import { Hotel } from "./pages/hotel/Hotel";
import { CreateHotel } from "./pages/hotel/CreateHotel";
import { HabitacionesPage } from "./pages/habitaciones/HabitacionesPage";
import { ReservacionesPage } from "./pages/reservaciones/ReservacionesPage";
import { EditHotel } from "./pages/hotel/EditHotel";


const routes = [
    { path: '/auth', element: <AuthPage /> },
    { path: "/", element: <Hotel /> },
    { path: "/create", element: <CreateHotel /> },
    { path: "/hotel/:id", element: <HabitacionesPage /> },
    { path: "/habitacion/:id", element: <ReservacionesPage /> },
    { path: "/hotel/update/:id", element: <EditHotel /> }
]

export default routes;
