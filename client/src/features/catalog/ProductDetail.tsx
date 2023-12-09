import React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    let params = useParams();
    return (
        <Typography variant="h2">
            Product Detail Page + {params.productId}
        </Typography>
    );
};

export default ProductDetail;
