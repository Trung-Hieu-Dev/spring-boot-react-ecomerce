import React from "react";
import { List } from "@mui/material";
import { Product } from "../../model/Product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

const ProductList = ({products}: Props) => {
    return (
        <List>
            {
                products.map((product: Product) =>
                    (
                        <ProductCard product={product} key={product.id}/>
                    ),
                )
            }
        </List>
    );
};

export default ProductList;
