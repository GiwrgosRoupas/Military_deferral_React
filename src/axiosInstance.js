import axios from "axios";

const axiosInstance= axios.create({
    baseURL: 'http://localhost:8080/',
     headers:{

         Accept: 'application/json',
         ContentType: 'application/json',
         AccessControlAllowOrigin: '*'
     }})

axiosInstance.interceptors.request.use((config)=>{
    config.headers={
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }


    return config
})


export default axiosInstance