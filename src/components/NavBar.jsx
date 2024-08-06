import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../img/Logo.png';
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getCant, useStateValue } from "../context/StateProvider";
import "../css/NavBar.css";

export default function NavBar() {
    const [{ basket, user }] = useStateValue();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert("Usuario no autorizado. Por favor, inicie sesión.");
            navigate("/signin");
        }
    }, [user, navigate]);

    return (
        <Box className={'root'}>
            <AppBar position="fixed" className={'appBar'}>
                <Toolbar>
                    <Link to={"/products"}>
                        <IconButton
                            edge="start"
                            className={'menuButton'}
                        >
                            <img src={logo} className={'image'} alt={'logo jhomt'} />
                        </IconButton>
                    </Link>
                    <div className={'grow'}>
                        <Typography variant="h6" color={'text-primary'} component={'p'}>
                            Hello {user ? user.name : "Guest"},
                        </Typography>
                        <div className={'button'}>
                            <Link to={user ? "/checkout" : "/signin"}>
                                <IconButton aria-label={'show cart items'} color={'inherit'}>
                                    <Badge badgeContent={getCant(basket)} color={'secondary'}>
                                        <ShoppingCart fontSize={'large'} color={'black'} />
                                    </Badge>
                                </IconButton>
                            </Link>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}