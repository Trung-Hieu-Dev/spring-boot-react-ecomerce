import React, { useContext } from "react";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { StoreContext } from "../../context/StoreContext";

const BasketPage = () => {
    const {basket} = useContext(StoreContext);

    if (!basket) return <Typography variant='h3'>No basket found..</Typography>

    return (
        <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
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
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">${(row.unitPrice * row.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <IconButton color={"warning"}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasketPage;
