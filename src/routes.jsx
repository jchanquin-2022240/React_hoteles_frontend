import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { EventsPage } from './pages/events/EventPage'

const routes = [
    {path: '/auth', element: <AuthPage/>},
    {path: "/", element: <DashboardPage/>},
    {path: "/event", element: <EventsPage/>}

]

export default routes