import React, { useEffect, useState } from "react";
import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../../model/Product";
// import LoadingComponent from "../../layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
// import { StoreContext } from "../../context/StoreContext";
import { useSelector } from "react-redux";
import { BasketItem } from "../../model/Basket";
import { store } from "../../store";
import { addBasketItemThunk, removeBasketItemThunk } from "../basket/BasketSlice";

const ProductDetail = () => {
    let params = useParams();
    const [product, setProduct] = useState<Product | null>();

    const {basket, status} = useSelector((state: any) => state.basket);

    const basketItem = basket?.basketItems.find((item: BasketItem) => item.productId === product?.id);
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        axios.get(`/products/${params.productId}`)
            .then(response => {
                    setProduct(response.data);
                    if (basketItem) {
                       setQuantity(basketItem!.quantity);
                    }
            })
            .catch(error => {
                console.log(error);
            })
    }, [basket, basketItem, params.productId]);

    const handleInputChange = (event: any) => {
        if (quantity > 0) {
            setQuantity(event.target.value)
        }
    }

    const handleUpdateCart = () => {
        let updatedQuantity: number;
        if (!basket || basketItem!.quantity < quantity) {
            updatedQuantity = quantity - basketItem!.quantity;
            store.dispatch(addBasketItemThunk({
                productId: product!.id,
                quantity: +updatedQuantity
            }))
        } else if (!basket || basketItem!.quantity > quantity) {
            updatedQuantity = basketItem!.quantity - quantity;
            store.dispatch(removeBasketItemThunk({
                productId: product!.id,
                quantity: +updatedQuantity
            }))
        }
    }

    if (!product) return <h3>No product found</h3>

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <img src={`${process.env.REACT_APP_BASE_URL}/file/image/${product?.imageUrl}`} alt={product?.name}
                     style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h3">{product?.name}</Typography>
                <Divider sx={{mb: 2}}/>

                <Typography variant="h4" color="secondary" sx={{mb: 4}}>
                    ${product?.unitPrice.toFixed(2)}
                </Typography>

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>{product?.category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Author</TableCell>
                                <TableCell>{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product?.unitsInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={2} mt={4}>
                    <Grid item xs={6}>
                        <TextField
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={basketItem?.quantity === quantity}
                            loading={status.includes('pending')}
                            color='primary'
                            size='large'
                            fullWidth
                            variant='contained'
                            sx={{height: '55px'}}
                            onClick={handleUpdateCart}
                        >
                            {basketItem ? 'Update quantity' : 'Add To Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductDetail;
