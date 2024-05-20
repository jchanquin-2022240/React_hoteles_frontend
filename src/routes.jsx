import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { ReservacionPage } from "./pages/reservacion/ReservationPage";

const routes = [
    {path: '/auth', element: <AuthPage/>},
    {path: "/", element: <DashboardPage/>},
    {path: "/habitacion/:id", element: <ReservacionPage/>},
]

export default routes