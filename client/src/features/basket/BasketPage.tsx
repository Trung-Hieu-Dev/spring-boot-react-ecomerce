import React, { useEffect, useState } from "react";
import { Basket } from "../../model/Basket";
import axios from "axios";
import LoadingComponent from "../../layout/LoadingComponent";
import { Typography } from "@mui/material";

const BasketPage = () => {
    const [basket, setBasket] = useState<Basket | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/baskets`)
            .then(res => setBasket(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent />

    if (!basket) return <Typography variant='h3'>No basket found..</Typography>

    return (
        <h1>
            Buyer id: {basket.buyerId}
        </h1>
    );
};

export default BasketPage;
