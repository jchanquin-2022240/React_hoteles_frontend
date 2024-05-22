import { AuthPage } from "./pages/auth";
import { Hotel } from "./pages/hotel/Hotel";
import { CreateHotel } from "./pages/hotel/CreateHotel";
import { EditHotel } from "./pages/hotel/EditHotel";
import { HabitacionesPage } from "./pages/habitaciones/HabitacionesPage";

const routes = [
    { path: '/auth', element: <AuthPage /> },
    { path: "/", element: <Hotel /> },
    { path: "/hotel", element: <Hotel /> },
    { path: "/create", element: <CreateHotel /> },
    { path: "/hotel/update/:id", element: <EditHotel /> },  // Aquí está la corrección
    { path: "/hotel/habitaciones/:id", element: <HabitacionesPage /> },
];

export default routes;
