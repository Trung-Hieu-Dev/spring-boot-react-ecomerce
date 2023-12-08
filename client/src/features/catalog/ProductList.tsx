import React from "react";
import { Grid, Paper, styled } from "@mui/material";
import { Product } from "../../model/Product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

const ProductList = ({products}: Props) => {
    return (
        <Grid container spacing={4}>
            {
                products.map((product: Product) =>
                    (
                        <Grid item xs={12} md={4} lg={3}  key={product.id} >
                            <ProductCard product={product} />
                        </Grid>
                    ),
                )
            }
        </Grid>
    );
};

export default ProductList;
