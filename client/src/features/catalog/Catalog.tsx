import React, { useEffect, useState } from "react";
import { Product } from "../../model/Product";
import ProductList from "./ProductList";


const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);
    return (
        <>
            <ProductList products={products}/>
        </>

    );
};

export default Catalog;
