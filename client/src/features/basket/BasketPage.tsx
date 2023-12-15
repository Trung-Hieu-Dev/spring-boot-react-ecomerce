import React, { useEffect, useState } from "react";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { AddCircle, Delete, RemoveCircle } from "@mui/icons-material";
// import { StoreContext } from "../../context/StoreContext";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../../store";
import { removeItemReducer, setBasketReducer } from "./BasketSlice";

const BasketPage = () => {
    // const {basket, setBasket, removeItem} = useContext(StoreContext); // context
    const {basket} = useSelector((state: any) => state.basket);

    const [status, setStatus] = useState<any>({
        loading: false,
        name: '',
        id: null,
    });

    useEffect(() => {
        axios.get('/baskets')
            // .then(res => setBasket(res.data)) // context
            .then(res => store.dispatch(setBasketReducer(res.data)))
            .catch(err => console.log(err))
    }, [basket]);

    const handleAddItem = (productId: number, name: string) => {
        setStatus({loading: true, name: name, id: productId});
        axios.post(`/baskets?productId=${productId}&quantity=${1}`)
            // .then(res => setBasket(res.data)) //context
            .then(res => store.dispatch(setBasketReducer(res.data)))
            .catch(err => console.log(err))
            .finally(() => setStatus({loading: false, name: name,  id: productId}));
    }

    const handleRemoveItem = (productId: number, quantity: number, name: string) => {
        setStatus({loading: true, name: name, id: productId});
        axios.delete(`/baskets?productId=${productId}&quantity=${quantity}`)
            // .then(() => removeItem(productId, quantity)) // context
            .then(() => store.dispatch(removeItemReducer({productId, quantity})))
            .catch(err => console.log(err))
            .finally(() => setStatus({loading: false, name: name,  id: productId}));
    }

    if (!basket) return <Typography variant='h3'>No basket found..</Typography>

    if (basket.basketItems.length <= 0) return <Typography variant='h3'>Basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.basketItems.map((row: any) => (
                            <TableRow
                                key={row.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">${row.unitPrice.toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'add' && status.id === row.productId}
                                        color='secondary'
                                        sx={{minWidth: 0}}
                                        onClick={() => handleAddItem(row.productId, 'add')}
                                    >
                                        <AddCircle />
                                    </LoadingButton>
                                    {row.quantity}
                                    <LoadingButton
                                        loading={status.loading && status.name === 'subtract'  && status.id === row.productId}
                                        color='error'
                                        sx={{minWidth: 0}}
                                        onClick={() => handleRemoveItem(row.productId, 1, 'subtract')}
                                    >
                                        <RemoveCircle />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${(row.unitPrice * row.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'remove' && status.id === row.productId}
                                        color={"warning"}
                                        onClick={() => handleRemoveItem(row.productId, row.quantity, 'remove')}
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container mt={2}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default BasketPage;
