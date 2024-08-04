import accounting from "accounting";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import {getBasketTotal, useStateValue, getCant} from "../context/StateProvider";
import {Badge} from "@mui/material";

const Root = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    margin: '10px',
    width: '100%',
    height: '100%',
}));

const Total = () => {
    const [{ basket }, dispatch] = useStateValue();

    return (
        <Root>
            <h5>Productos Seleccionados: '  {<Badge badgeContent={getCant(basket)}></Badge>}  '</h5>
            <h5>{accounting.formatMoney(getBasketTotal(basket), "S/")}</h5>
            <Button sx={{ marginTop: '10px' }} variant="contained" color="secondary">CheckOut</Button>
        </Root>
    );
}
export default Total;
