import React, { useEffect, useState } from "react";
import { Basket } from "../../model/Basket";
import axios from "axios";
import LoadingComponent from "../../layout/LoadingComponent";
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

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const BasketPage = () => {
    const [basket, setBasket] = useState<Basket | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/baskets`)
            .then(res => setBasket(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent />

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
