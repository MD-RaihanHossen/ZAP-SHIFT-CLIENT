import { Navigate } from "react-router-dom";
import UseAdminHook from "../CustomHook/UseAdminHook";
import Loader from "../Loader/Loader";


const AdminRoutes = ({ children  }) => {

    const [isAdmin, isLoading,] = UseAdminHook()

    if(isLoading){
        return <Loader></Loader>
    }

    if(isAdmin?.roll === "admin"){
        return children
    }

    return <Navigate to={'/'} state={location.pathname}></Navigate>;
};

export default AdminRoutes;