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
import { actionTypes, useStateValue } from "../context/StateProvider";

export default function CheckOutCard({product}) {
    const { id, name, productType, price, image, description, rating } = product;
    const [{ basket }, dispatch] = useStateValue();

    const removeItem = () => {
        dispatch({
            type: actionTypes.REMOVE_FROM_BASKET,
            id: product.id
        });
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
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
                subheader="In stock"
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={name}
            />
            <CardActions disableSpacing className={'card-start'}>
                <div className={'rating'}>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>&#11088;</p>
                        ))
                    }
                </div>
                <IconButton>
                    <DeleteIcon fontSize={'large'} onClick={removeItem} />
                </IconButton>
            </CardActions>
        </Card>
    );
}

