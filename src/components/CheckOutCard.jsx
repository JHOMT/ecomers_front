import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import accounting from 'accounting';
import '../css/CheckOutCard.css';
import IconButton from "@mui/material/IconButton";
import { Button } from '@mui/material';
import { actionTypes, useStateValue } from "../context/StateProvider";
import {styled} from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
}));

export default function CheckOutCard({ product }) {
    const { id, name, price, image, quantity, stock } = product;
    const [, dispatch] = useStateValue();

    const removeItem = () => {
        dispatch({
            type: actionTypes.REMOVE_FROM_BASKET,
            id: id
        });
    }

    const increaseQuantity = () => {
        dispatch({
            type: actionTypes.INCREASE_QUANTITY,
            id: id
        });
    }

    const decreaseQuantity = () => {
        dispatch({
            type: actionTypes.DECREASE_QUANTITY,
            id: id
        });
    }

    return (
        <StyledCard sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <Typography
                        className={'action'}
                        variant={'h5'}
                        color={'textSecondary'}
                    >
                        {accounting.formatMoney(price, "S/")}
                    </Typography>
                }
                title={name}
                subheader={`En stock: ${stock}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={name}
            />
            <CardActions disableSpacing className={'card-start'}>
                <Button onClick={decreaseQuantity} size="small" color="primary">-</Button>
                <Typography variant="body2" color="textSecondary" component="p">
                    {quantity}
                </Typography>
                <Button onClick={increaseQuantity} size="small" color="primary">+</Button>
                <IconButton onClick={removeItem}>
                    <DeleteIcon fontSize={'large'} />
                </IconButton>
            </CardActions>
        </StyledCard>
    );
}