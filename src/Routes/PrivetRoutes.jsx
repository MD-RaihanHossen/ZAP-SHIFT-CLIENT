import { Navigate, useLocation } from "react-router-dom";
import AuthContextHook from "../CustomHook/AuthContextHook";
import Loader from "../Loader/Loader";


const PrivetRoutes = ({ children }) => {

    const { loader , user , } = AuthContextHook()

    

    const location = useLocation()
    

    if(loader){
        return <Loader></Loader>
    }

    if(user&& user?.email){
        return children;
    }

    return (
        <div>
           <Navigate to={'/login'} state={location.pathname}></Navigate>
        </div>
    );
};

export default PrivetRoutes;