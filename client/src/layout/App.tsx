import React, { useState } from "react";
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

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    return (
        <ThemeProvider theme={theme}>
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
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
