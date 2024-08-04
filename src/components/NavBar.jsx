import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../img/Logo.png';
import {ShoppingCart} from "@mui/icons-material";
import {Badge} from "@mui/material";
import {Link} from "react-router-dom";
import {getCant, useStateValue} from "../context/StateProvider";
import "../css/NavBar.css";

export default function NavBar() {
    const [{ basket }, dispatch] = useStateValue();

    return (
        <Box className={'root'}>
            <AppBar position="fixed" className={'appBar'}>
                <Toolbar>
                    <Link to={"/"}>
                        <IconButton
                            edge="start"
                            className={'menuButton'}
                        >
                            <img src={logo} className={'image'} alt={'logo jhomt'} />
                        </IconButton>
                    </Link>
                    <div className={'grow'}>
                        <Typography variant="h6" color={'text-primary'} component={'p'}>
                            Hello Guest,
                        </Typography>
                        <div className={'button'}>
                            <Link to={"/signin"}>
                                <Button variant={'outlined'}>
                                    <strong>Sing In</strong>
                                </Button>
                            </Link>
                            <Link to={"/checkout"}>
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
};