import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import "../css/Products.css";
import IconButton from "@mui/material/IconButton";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [types, setTypes] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        }
        axios.get('http://localhost:8080/products')
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/typeProduct')
            .then((response) => {
                setTypes(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleSearch = () => {
        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const handleFilter = (type) => {
        setFilteredProducts(
            products.filter(product =>
                product.productType.toLowerCase() === type.toLowerCase()
            )
        );
    };

    return (
        <Box className={'root'}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: 2,
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Buscar"
                                id="fullWidth"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ marginRight: 1 }}
                            />
                            <IconButton variant="contained" fontSize={'small'} color="primary" onClick={handleSearch}>
                                <SearchIcon fontSize={'large'} />
                            </IconButton>
                        </Box>
                        <FormControl className={'formTypes'} component="fieldset" sx={{ marginTop: 2 }}>
                            <FormLabel component="legend">Categorías</FormLabel>
                            <RadioGroup
                                aria-label="categories"
                                name="categories"
                            >
                                {types.map((type) => (
                                    <FormControlLabel
                                        key={type.id}
                                        value={type.name}
                                        control={<Radio />}
                                        label={type.name}
                                        onClick={() => handleFilter(type.name)}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Grid container spacing={3}>
                        {filteredProducts.map((product) => (
                            <Grid item key={product.id} xs={12} sm={8} md={6} lg={4}>
                                <Product product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Products;
