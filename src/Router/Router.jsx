import { createBrowserRouter } from "react-router-dom";
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
                loader : () => fetch('/warehouses.json')
            },
            {
                path: 'percel',
                element: <PrivetRoutes> <SendToParcel></SendToParcel> </PrivetRoutes> ,
                loader : () => fetch('/warehouses.json'), 
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
                path: 'mypercels',
                Component: MyPercel,
            }
        ]
    }

])

export default Router;