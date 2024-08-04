import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const initialState = {
    basket: [],
    user: null,
};

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",
    SET_USER: "SET_USER",
};

export const getBasketTotal = (basket) =>{
    return basket?.reduce((amount, item) => item.price + amount, 0);
}

export const getCant = (basket) => {
    if (basket.length === 0) {
        return 0;
    }
    return basket?.length;
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.ADD_TO_BASKET:
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case actionTypes.REMOVE_FROM_BASKET:
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product (id: ${action.id}) as it's not in basket!`
                );
            }
            return {
                ...state,
                basket: newBasket,
            };
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default reducer;
