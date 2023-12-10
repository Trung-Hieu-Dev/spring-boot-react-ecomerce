import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./layout/App";
import { BrowserRouter } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(res => {
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

        default:
            toast.error(error.response?.data.message, {theme: 'dark'});
            break;
    }
    return Promise.reject(error);
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);
