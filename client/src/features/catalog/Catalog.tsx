import React, { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { fetchProductsThunk, productsAdapter } from "./catalogSlice";
import { store } from "../../store";
import { useSelector } from "react-redux";


const Catalog = () => {
    const products = productsAdapter.getSelectors().selectAll(store.getState().catalog);
    const {status} = useSelector((state: any) => state.catalog)

    useEffect(() => {
        store.dispatch(fetchProductsThunk());
    }, []);

    if (status === 'pendingFetchProducts') return <LoadingComponent />

    return (
        <>
            <ProductList products={products}/>
        </>

    );
};

export default Catalog;
