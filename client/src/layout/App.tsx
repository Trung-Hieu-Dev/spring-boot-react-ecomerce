import React, { useEffect, useState } from "react";
import "./App.css";
import { Product } from "../model/Product";
import Catalog from "../features/catalog/Catalog";
import Header from "./Header";
import { Container, createTheme, CssBaseline, styled, Switch, ThemeProvider } from "@mui/material";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header onSetDarkMode={setDarkMode} darkMode={darkMode}/>
            <Container>
                <Catalog />
            </Container>
        </ThemeProvider>
    );
}

export default App;
