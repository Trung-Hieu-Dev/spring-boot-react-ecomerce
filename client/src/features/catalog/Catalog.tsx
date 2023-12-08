import React from "react";
import { Product } from "../../model/Product";

interface Props {
    products: Product[],
    onAddProduct: () => void
}

const Catalog = ({products, onAddProduct}: Props) => {
    return (
        <>
            <button onClick={onAddProduct}>Add Product</button>
            <ul>
                {
                    products.map((product: Product, index: number) =>
                        (
                            <li key={index}>{product.name} - price: {product.unitPrice}</li>
                        ),
                    )
                }
            </ul>
        </>

    );
};

export default Catalog;
