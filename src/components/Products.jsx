import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import products from "../data/product_data";
import "../css/Products.css";
import Product from "./Product";
import Typography from "@mui/material/Typography";

function Products() {
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
