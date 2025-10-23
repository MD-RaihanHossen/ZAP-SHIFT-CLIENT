import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";


const AuthContextHook = () => {
    const useCustomContext = useContext(AuthContext)
    return useCustomContext
};

export default AuthContextHook;