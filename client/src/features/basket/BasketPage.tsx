import React, { useContext, useEffect, useState } from "react";
import {
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
import { StoreContext } from "../../context/StoreContext";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

const BasketPage = () => {
    const {basket, setBasket, removeItem} = useContext(StoreContext);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        axios.get('/baskets')
            .then(res => setBasket(res.data))
            .catch(err => console.log(err))
    }, [setBasket, basket]);

    const handleAddItem = (productId: number) => {
        setLoading(true);
        axios.post(`/baskets?productId=${productId}&quantity=${1}`)
            .then(res => setBasket(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    const handleRemoveItem = (productId: number, quantity: number) => {
        setLoading(true);
        axios.delete(`/baskets?productId=${productId}&quantity=${quantity}`)
            .then(() => removeItem(productId, quantity))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    if (!basket) return <Typography variant='h3'>No basket found..</Typography>

    return (
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
                    {basket.basketItems.map((row) => (
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
                                    loading={loading}
                                    color='secondary'
                                    sx={{minWidth: 0}}
                                    onClick={() => handleAddItem(row.productId)}
                                >
                                    <AddCircle />
                                </LoadingButton>
                                {row.quantity}
                                <LoadingButton
                                    loading={loading}
                                    color='error'
                                    sx={{minWidth: 0}}
                                    onClick={() => handleRemoveItem(row.productId, 1)}
                                >
                                    <RemoveCircle />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">${(row.unitPrice * row.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <LoadingButton
                                    loading={loading}
                                    color={"warning"}
                                    onClick={() => handleRemoveItem(row.productId, row.quantity)}
                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasketPage;
