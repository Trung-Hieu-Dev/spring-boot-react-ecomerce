import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Catalog from "../features/catalog/Catalog";
import Header from "./Header";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import ProductDetail from "../features/catalog/ProductDetail";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import Uploader from "../features/upload/Uploader";
import { ToastContainer } from "react-toastify";
import AxiosInterceptor from "../interceptor/AxiosInterceptor";
import NotFound from "../features/error/NotFound";
import BasketPage from "../features/basket/BasketPage";
import { getCookie } from "../util/util";
import { StoreContext } from "../context/StoreContext";
import axios, { AxiosResponse } from "axios";
import LoadingComponent from "./LoadingComponent";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const {setBasket} = useContext(StoreContext);
    const [loading, setLoading] = useState<boolean>();

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    useEffect(() => {
        const buyerId = getCookie('buyerId');
        if (buyerId) {
            setLoading(true);
            axios.get('/baskets')
                .then((res:AxiosResponse) => setBasket(res.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        }
    }, [setBasket]);

    if (loading) return <LoadingComponent />

    return (
        <ThemeProvider theme={theme}>
            <AxiosInterceptor>
                <ToastContainer position='bottom-right' hideProgressBar />
                <CssBaseline/>
                <Header onSetDarkMode={setDarkMode} darkMode={darkMode}/>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomePage />}/>
                        <Route path='catalog' element={<Catalog />}/>
                        <Route path='/catalog/:productId' element={<ProductDetail />}/>
                        <Route path='about' element={<AboutPage />}/>
                        <Route path='/contact' element={<ContactPage />}/>
                        <Route path='/upload' element={<Uploader />}/>
                        <Route path='/basket' element={<BasketPage />}/>
                        <Route path='/not-found' element={<NotFound />}/>
                        <Route path='*' element={<NotFound />}/>
                    </Routes>
                </Container>
            </AxiosInterceptor>
        </ThemeProvider>
    );
}

export default App;
