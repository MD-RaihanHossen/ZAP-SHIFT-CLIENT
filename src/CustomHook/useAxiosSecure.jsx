import axios from "axios";
import AuthContextHook from "./AuthContextHook";
import { useNavigate } from "react-router-dom";



const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {

    const navigate = useNavigate()

    //call user form Context hook
    const { user, logOut } = AuthContextHook()
    // console.log(user)

    axiosSecure.interceptors.request.use((config) => {
        //set to token in server
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
    })


    axiosSecure.interceptors.response.use(res => {
        return res;
    },(error) => {
        console.log('insite res interseptor', error)
        const status = error.status

        if (status === 403) {
            console.log('status : 403')
            navigate('forbiden')
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch((error) => {
                    console.lo(error)
                })
        }
       
        return Promise.reject(error)
    }) 

    return axiosSecure;
};

export default useAxiosSecure;

 