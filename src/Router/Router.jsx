import { createBrowserRouter } from "react-router-dom";
import Home from "../RootLayout/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import AuthLayOut from "../AuthLayOut/AuthLayOut";
import Login from "../AuthLayOut/Login/Login";
import Signup from "../AuthLayOut/Signup/Signup";
import Coverage from "../Pages/Coverage";
import SendToParcel from "../AuthLayOut/Pages/SendToParcel";
import PrivetRoutes from "../Routes/PrivetRoutes";


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

])

export default Router;