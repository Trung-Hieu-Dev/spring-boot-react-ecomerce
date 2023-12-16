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
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { BasketItem } from "../../model/Basket";
import { store } from "../../store";
import { addBasketItemThunk, removeBasketItemThunk } from "../basket/BasketSlice";
import { fetchProductByIdThunk, productsAdapter } from "./catalogSlice";
import LoadingComponent from "../../layout/LoadingComponent";

const ProductDetail = () => {
    let params = useParams();

    const product = productsAdapter.getSelectors().selectById(
        store.getState().catalog,
        +params.productId!
    )

    const {basket, status} = useSelector((state: any) => state.basket);
    const {productStatus} = useSelector((state:any) => state.catalog);

    const basketItem = basket?.basketItems.find((item: BasketItem) => item.productId === product?.id);
    const [quantity, setQuantity] = useState<number>(basketItem?.quantity | 0);

    useEffect(() => {
        if (!product && !basket) {
            store.dispatch(fetchProductByIdThunk(+params.productId!));
        }
    }, [basketItem?.quantity, params.productId, product, basket]);

    const handleInputChange = (event: any) => {
        if (quantity > 0) {
            setQuantity(event.target.value)
        }
        if (quantity === 0) {
            setQuantity(0)
        }
    }

    const handleUpdateCart = () => {
        let updatedQuantity: number;
        if (!basket || basket.basketItems.length >= 0 || basketItem?.quantity < quantity) {
            if (basketItem?.quantity) {
                updatedQuantity = quantity - basketItem?.quantity;
            } else {
                updatedQuantity = quantity;
            }
            store.dispatch(addBasketItemThunk({
                productId: product!.id,
                quantity: +updatedQuantity
            }))
        } else if (!basket || basketItem?.quantity > quantity) {
            updatedQuantity = basketItem?.quantity - quantity | quantity;
            store.dispatch(removeBasketItemThunk({
                productId: product!.id,
                quantity: +updatedQuantity
            }))
        }
    }

    if (productStatus === 'pendingFetchProductById') return <LoadingComponent />

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
