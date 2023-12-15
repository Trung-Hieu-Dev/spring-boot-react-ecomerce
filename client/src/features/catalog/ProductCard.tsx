import React, { useState } from "react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../model/Product";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
// import { StoreContext } from "../../context/StoreContext";
import { store } from "../../store";
import { setBasketReducer } from "../basket/BasketSlice";

interface Props {
    product: Product,
}

const ProductCard = ({product}: Props) => {
    // const {setBasket} = useContext(StoreContext); // context
    const [loading, setLoading] = useState(false);
    const handleAddToCart = (productId: number) => {
        setLoading(true);
        axios.post(`/baskets?productId=${productId}&quantity=${1}`, {})
            // .then(res => setBasket(res.data)) // context
            .then(res => store.dispatch(setBasketReducer(res.data)))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{backgroundColor: red[500]}} aria-label="category">
                        {product.category.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{fontWeight: "bold", color: "primary.main"}}
                sx={{height: 100}}
            />
            <CardMedia
                sx={{height: 380}}
                image={`http://localhost:8080/api/file/image/${product.imageUrl}`}
                component={"img"}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    ${product.unitPrice.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={loading}
                    size="small"
                    onClick={() => handleAddToCart(product.id)}
                >
                    Add To Cart
                </LoadingButton>
                <Button
                    size="small"
                    component={Link}
                    to={`/catalog/${product.id}`}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
