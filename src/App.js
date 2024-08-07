import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import CheckOutPage from "./components/CheckOutPage";
import Products from "./components/Products";
import reducer, { StateProvider, initialState } from "./context/StateProvider";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
    return (
        <StateProvider initialState={initialState} reducer={reducer} >
            <Router>
                <div className="App">
                    <Routes>
                        <Route element={<NavBarLayout />}>
                            <Route path="/products" element={<Products />} />
                            <Route path="/checkout" element={<CheckOutPage />} />
                        </Route>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </div>
            </Router>
        </StateProvider>
    );
}

function NavBarLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default App;
