import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { Hotel } from "./pages/hotel/Hotel";
import { CreateHotel } from "./pages/hotel/CreateHotel"

const routes = [
    { path: '/auth', element: <AuthPage /> },
    { path: "/", element: <DashboardPage /> },
    { path: "/hotel", element: <Hotel /> },
    { path: "/create", element: <CreateHotel /> }
]

export default routes