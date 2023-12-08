import React from "react";
import { Product } from "../../model/Product";
import ProductList from "./ProductList";

interface Props {
    products: Product[],
    onAddProduct: () => void
}

const Catalog = ({products, onAddProduct}: Props) => {
    return (
        <>
            <button onClick={onAddProduct}>Add Product</button>
            <ProductList products={products} />
        </>

    );
};

export default Catalog;
