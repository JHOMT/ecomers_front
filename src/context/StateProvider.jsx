import React, { createContext, useContext, useReducer, useEffect } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const persistedState = localStorage.getItem('basketState');
        return persistedState ? JSON.parse(persistedState) : initial;
    });

    useEffect(() => {
        localStorage.setItem('basketState', JSON.stringify(state));
    }, [state]);

    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);

export const initialState = {
    basket: [],
    user: null,
};

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",
    INCREASE_QUANTITY: "INCREASE_QUANTITY",
    DECREASE_QUANTITY: "DECREASE_QUANTITY",
    SET_USER: "SET_USER",
    REMOVE_ALL_FROM_BASKET: "REMOVE_ALL_FROM_BASKET",
};

export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);
}

export const getCant = (basket) => {
    return basket?.reduce((count, item) => item.quantity + count, 0);
}

export const getUser = (user) => {
    return user;
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.ADD_TO_BASKET:
            const existingIndex = state.basket.findIndex(item => item.id === action.item.id);
            if (existingIndex >= 0) {
                let newBasket = [...state.basket];
                newBasket[existingIndex] = {
                    ...newBasket[existingIndex],
                    quantity: newBasket[existingIndex].quantity + 1
                };
                return {
                    ...state,
                    basket: newBasket,
                };
            } else {
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, quantity: 1 }],
                };
            }
        case actionTypes.REMOVE_FROM_BASKET:
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id),
            };
        case actionTypes.INCREASE_QUANTITY:
            return {
                ...state,
                basket: state.basket.map(item =>
                    item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case actionTypes.DECREASE_QUANTITY:
            return {
                ...state,
                basket: state.basket.map(item =>
                    item.id === action.id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.REMOVE_ALL_FROM_BASKET:
            return {
                ...state,
                basket: [],
            };
        default:
            return state;
    }
};

export default reducer;