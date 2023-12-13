import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const BasketSummary = () => {
    const {basket} = useContext(StoreContext);

    const subTotal = basket
        ? basket.basketItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
        : 0;

    const deliveryFee = subTotal > 100 ? 0 : 5;

    return (
        <>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography variant='h6'>Orders Details</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell>${subTotal.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery Fee</TableCell>
                            <TableCell>${deliveryFee.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell>${(deliveryFee + subTotal).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                            <span style={{fontStyle: 'italic'}}>
                                *Orders over $100 will be qualified for free delivery
                            </span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BasketSummary;
