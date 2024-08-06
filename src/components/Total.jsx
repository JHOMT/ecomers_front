import React from "react";
import accounting from "accounting";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { getBasketTotal, useStateValue, getCant, actionTypes } from "../context/StateProvider";
import { Badge } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Root = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    margin: "10px",
    width: "100%",
    height: "100%",
}));

const Total = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const sale = async () => {

        for (let item of basket) {
            if (item.quantity > item.stock) {
                alert(`La cantidad de ${item.name} excede el stock disponible.`);
                return;
            }
        }

        const saleData = {
            userId: user.id,
            saleItems: basket.map((item) => ({
                productId: item.id,
                quantity: item.quantity
            }))
        };

        try {
            const response = await axios.post('http://localhost:8080/sales', saleData);
            alert("Venta realizada exitosamente:", response.data);

            dispatch({
                type: actionTypes.REMOVE_ALL_FROM_BASKET,
            });

            navigate("/products");
        } catch (error) {
            console.error("Hubo un error al realizar la venta:", error);
        }
    };

    return (
        <Root>
            <h5>
                Productos Seleccionados:{" "}
                <Badge badgeContent={getCant(basket)} color="primary" />
            </h5>
            <h5>{accounting.formatMoney(getBasketTotal(basket), "S/")}</h5>
            <Button sx={{ marginTop: "10px" }} variant="contained" color="secondary" onClick={sale}>
                CheckOut
            </Button>
        </Root>
    );
};

export default Total;
