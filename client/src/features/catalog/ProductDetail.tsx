import React, { useEffect, useState } from "react";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../../model/Product";
import LoadingComponent from "../../layout/LoadingComponent";

const ProductDetail = () => {
    let params = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>();

    useEffect(() => {
        axios.get(`/products/${params.productId}`)
            .then(response => {
                    setProduct(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, [params.productId]);

    if (loading) return <LoadingComponent />

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
            </Grid>
        </Grid>
    );
};

export default ProductDetail;
