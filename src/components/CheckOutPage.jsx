import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckOutCard from "./CheckOutCard";
import Total from "./Total";
import "../css/Products.css";
import { useStateValue } from "../context/StateProvider";

const CheckOutPage = () => {
    const [{ basket }] = useStateValue();

    function FormRow() {
        return (
            <React.Fragment>
                {basket.map((item) => (
                    <Grid item key={item.id} xs={12} sm={8} md={6} lg={4}>
                        <CheckOutCard product={item} />
                    </Grid>
                ))}
            </React.Fragment>
        );
    }

    return (
        <Box className={'root'}>
            <Grid container spacing={3} className={'grid'}>
                <Grid item xs={12}>
                    <Typography align={'center'} gutterBottom variant={'h4'}>
                        Shopping Cart
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={9} container spacing={2}>
                    <FormRow />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography align={'center'} gutterBottom variant={'h6'}>
                        <Total />
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CheckOutPage;