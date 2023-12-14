import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./layout/App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./context/StoreProvider";
import { Provider } from "react-redux";
import { store } from "./store";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL; // set base url
axios.defaults.withCredentials = true // allow to work with cookie

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <StoreProvider>
                  <App />
              </StoreProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
