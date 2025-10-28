import axios from "axios";


const useAxiosBase = axios.create({
     baseURL: 'http://localhost:3000'
})

const AxiosBaseUrl = () => {
    return useAxiosBase
};

export default AxiosBaseUrl;