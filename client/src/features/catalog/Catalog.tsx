import React, { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { fetchProductsThunk, productsAdapter } from "./catalogSlice";
import { store } from "../../store";
import { useSelector } from "react-redux";


const Catalog = () => {
    const products = productsAdapter.getSelectors().selectAll(store.getState().catalog);
    const {status, productLoaded} = useSelector((state: any) => state.catalog)

    useEffect(() => {
        if (!productLoaded) {
            store.dispatch(fetchProductsThunk());
        }
    }, [productLoaded, products]);

    if (status === 'pendingFetchProducts') return <LoadingComponent />

    return (
        <>
            <ProductList products={products}/>
        </>

    );
};

export default Catalog;
