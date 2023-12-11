import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AxiosInterceptor = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
         function interceptorToCheckError() {
           const interceptor = axios.interceptors.response.use(res => {
                return res
            }, (error: AxiosError<any>) => {
                console.log("Interceptor run to get error message")
                switch (error.response?.status) {
                    case 400:
                        if (error.response?.data.message) {
                            throw error.response?.data.message.split('; ')
                                .filter((message: string) => message !== '');
                        }
                        toast.error(error.response?.data.message, {theme: 'colored'});
                        break;

                    case 404:
                        if (!ignore) {
                            navigate('/not-found');
                        }
                        break;

                    default:
                        toast.error(error.response?.data.message, {theme: 'dark'});
                        break;
                }
                return Promise.reject(error);
            })
        }

        let ignore = false;
        interceptorToCheckError();
        return () => {
            ignore = true;
        }
    })

    return props.children;
};

export default AxiosInterceptor;
