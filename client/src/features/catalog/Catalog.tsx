import React, { useEffect, useState } from "react";
import { Product } from "../../model/Product";
import ProductList from "./ProductList";
import axios, { AxiosResponse } from "axios";
import LoadingComponent from "../../layout/LoadingComponent";


const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch("http://localhost:8080/api/products")
        //     .then(response => response.json())
        //     .then(data => setProducts(data));

        axios.get('/products')
            .then((response: AxiosResponse) => setProducts(response.data))
            .finally(() => setLoading(false))
    }, []);

    if (loading) return <LoadingComponent />

    return (
        <>
            <ProductList products={products}/>
        </>

    );
};

export default Catalog;
