import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../LayOuts/RootLayout/Home/Home";
import RootLayout from "../LayOuts/RootLayout/RootLayout";
import AuthLayOut from "../LayOuts/AuthLayOut/AuthLayOut";
import Login from "../LayOuts/AuthLayOut/Login/Login";
import Signup from "../LayOuts/AuthLayOut/Signup/Signup";
import Coverage from "../Pages/Coverage";
import SendToParcel from "../LayOuts/AuthLayOut/Pages/SendToParcel";
import PrivetRoutes from "../Routes/PrivetRoutes";
import DrshbordLayOut from "../LayOuts/DrshbordLayOut/DrshbordLayOut";
import MyPercel from "../LayOuts/DrshbordLayOut/MyPercel/MyPercels";
import Payments from "../LayOuts/DrshbordLayOut/PayOrders/Payments";
import PaymentHistory from "../LayOuts/DrshbordLayOut/PaymentHistory/PaymentHistory";
import BeRiders from "../Pages/Be_a_Riders/BeRiders";
import PendingRiders from "../LayOuts/DrshbordLayOut/Pending_Riders/PendingRiders";
import ActiveRiders from "../LayOuts/DrshbordLayOut/ActiveR_Riders/ActiveRiders";


const Router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/warehouses.json')
            },
            {
                path: 'percel',
                element: <PrivetRoutes> <SendToParcel></SendToParcel> </PrivetRoutes>,
                loader: () => fetch('/warehouses.json'),
            },
            {
                path: 'riders',
                element: <PrivetRoutes> <BeRiders></BeRiders> </PrivetRoutes>,
                loader: () => fetch('/warehouses.json'),
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayOut,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'signup',
                Component: Signup,

            }
        ]
    },
    {
        path: 'drshbord',
        element: <PrivetRoutes><DrshbordLayOut></DrshbordLayOut></PrivetRoutes>,
        children: [
            {
                path: "",
                element: <Navigate to={'/drshbord/mypercels'}></Navigate>

            },
            {
                path: 'mypercels',
                Component: MyPercel,
            },
            {
                path: 'payments/:percelId', ///drshbord/payments/${id} came from Mypercel Pay Button 
                Component: Payments,
            },
            {
                path: 'paymenthistory',
                Component: PaymentHistory,
            },
            {
                path: 'pendingRiders',
                Component: PendingRiders,
            },
            {
                path: 'activeRiders',
                Component: ActiveRiders,
            },

        ]
    }

])

export default Router;