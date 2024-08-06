import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <Box className={'root'}>
            <Grid container spacing={3} className={'grid'}>
                <Grid item xs={12}>
                    <Typography align={'center'} gutterBottom variant={'h4'}>
                        Lista de Productos
                    </Typography>
                </Grid>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Products;