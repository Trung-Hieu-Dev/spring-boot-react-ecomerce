import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './layout/App';
import { BrowserRouter } from "react-router-dom";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(res => {
    return res
}, (error: AxiosError) => {
    console.log("Interceptor run to get error message")
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
