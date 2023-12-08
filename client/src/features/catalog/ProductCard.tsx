import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../model/Product";

interface Props {
    product: Product,
}

const ProductCard = ({product}: Props) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={`http://localhost:8080/api/file/image/${product.imageUrl}`}/>
            </ListItemAvatar>
            <ListItemText>
                {product.name} - price: {product.unitPrice}
            </ListItemText>
        </ListItem>
    );
};

export default ProductCard;
