import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import CheckOutPage from "./components/CheckOutPage";
import Products from "./components/Products";
import reducer, {StateProvider, initialState} from "./context/StateProvider";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <Router>
                <div className="App">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path={"/signin"} element={<SignIn />} />
                        <Route path={"/signup"} element={<SignUp />} />
                        <Route path="/checkout" element={<CheckOutPage />} />
                    </Routes>
                </div>
            </Router>
        </StateProvider>
    );
}

export default App;

