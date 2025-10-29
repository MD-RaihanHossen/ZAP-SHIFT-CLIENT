import axios from "axios";
import AuthContextHook from "./AuthContextHook";



const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {

    //call user form Context hook
    const { user } = AuthContextHook()
    // console.log(user)

    axiosSecure.interceptors.request.use((config) => {
        //set to token in server
        config.headers.Authorization = `Bearer ${user?.accessToken}`

        return config;
    }, (error)=>{
        // Do something with request error
        return Promise.reject(error);
    },
    )

    return axiosSecure;
};

export default useAxiosSecure;