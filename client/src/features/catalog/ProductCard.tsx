import React from "react";
import {
    Avatar, Button,
    Card, CardActions,
    CardContent, CardHeader,
    CardMedia, IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import { Product } from "../../model/Product";
import { red } from "@mui/material/colors";

interface Props {
    product: Product,
}

const ProductCard = ({product}: Props) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ backgroundColor: red[500] }} aria-label="category">
                        {product.category.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{fontWeight: "bold", color: 'primary.main'}}
                sx={{height: 100}}
            />
            <CardMedia
                sx={{ height: 380 }}
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
                <Button size="small">Add To Cart</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
