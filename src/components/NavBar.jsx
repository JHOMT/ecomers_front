import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../img/Logo.png';
import { ShoppingCart } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Badge, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getCant, useStateValue } from "../context/StateProvider";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "../css/NavBar.css";
import MenuOptions from "./MenuOptions";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#204baf',
        },
    },
});

const SocialIcons = () => (
    <div className="social-icons">
        <Link to={"https://web.facebook.com/jhoncleiver.mendozatiquillahuanca/"} target="_blank" rel="noopener noreferrer">
            <IconButton>
                <FacebookIcon fontSize={'large'} color={'primary'} />
            </IconButton>
        </Link>
        <Link to={"https://github.com/JHOMT"} target="_blank" rel="noopener noreferrer">
            <IconButton>
                <GitHubIcon fontSize={'large'} color={'primary'} />
            </IconButton>
        </Link>
    </div>
);

export default function NavBar() {
    const [{ basket, user }] = useStateValue();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (!user) {
            alert("Usuario no autorizado. Por favor, inicie sesión.");
            navigate("/");
        }
    }, [user, navigate]);

    const validCart = () => {
        if (basket.length === 0) {
            Swal.fire({
                title: 'No hay productos en el carrito',
                text: "¡Seleccione algun producto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Seleccionar'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/products");
                }
            });
        }else {
            navigate("/checkout");
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="fixed" className={'AppBar'}>
                <Toolbar className={'toolbar'}>
                    <Link to={"/products"}>
                        <IconButton
                            edge="start"
                            className={'menuButton'}
                        >
                            <img src={logo} className={'image'} alt={'logo jhomt'} />
                        </IconButton>
                    </Link>
                    <div className={'social'}>
                        {!isMobile && <SocialIcons />}
                    </div>
                    <div className={'grow'}>
                        <Typography variant="h6" component={'p'}>
                            Hello {user ? user.name : "Guest"},
                        </Typography>
                        <div className={'button'}>
                            <Grid onClick={validCart}>
                                <IconButton aria-label={'show cart items'} color={'inherit'}>
                                    <Badge badgeContent={getCant(basket)} color={'secondary'}>
                                        <ShoppingCart fontSize={'large'} />
                                    </Badge>
                                </IconButton>
                            </Grid>
                        </div>
                    </div>
                    <div className={'optionsMenu'}>
                        <MenuOptions />
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}