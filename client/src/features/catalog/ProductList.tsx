import React from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../model/Product";

interface Props {
    products: Product[];
}

const ProductList = ({products}: Props) => {
    return (
        <List>
            {
                products.map((product: Product, index: number) =>
                    (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar src={`http://localhost:8080/api/file/image/${product.imageUrl}`}/>
                            </ListItemAvatar>
                            <ListItemText>
                                {product.name} - price: {product.unitPrice}
                            </ListItemText>
                        </ListItem>
                    ),
                )
            }
        </List>
    );
};

export default ProductList;
