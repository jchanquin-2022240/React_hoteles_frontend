import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { Hotel } from "./pages/hotel/Hotel";

const routes = [
    {path: '/auth', element: <AuthPage/>},
    {path: "/", element: <Hotel/>},
    {path: "/hotel", element: <Hotel/>}
]

export default routes