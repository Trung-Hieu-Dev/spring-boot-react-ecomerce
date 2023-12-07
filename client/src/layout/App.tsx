import React, { useEffect, useState } from "react";
import "./App.css";
import { Product } from "../model/Product";
import Catalog from "../features/catalog/Catalog";

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const addProduct = () => {
        setProducts((prevState:Product[]) => [...prevState, {
            id: prevState.length + 1,
            name: 'product ' + (prevState.length + 1),
            description: 'desc product ' + (prevState.length + 1),
            imageUrl: 'NONE',
            brand: 'NA',
            unitsInStock: 100,
            category: 'NA',
            unitPrice: 11 * (prevState.length + 1)
        }])
    }

    return (
        <div>
            <h1>My Shop</h1>
            <Catalog products={products} onAddProduct={addProduct}/>
        </div>
    );
}

export default App;
