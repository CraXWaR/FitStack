import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";

import './App.css'

import Home from "./pages/Home/Home.tsx";
import Header from "./components/Layout/General/Header.tsx";
import Footer from "./components/Layout/General/Footer.tsx";
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";

const RootLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>

            <main className="flex-1 flex flex-col items-center justify-center px-6">
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </main>

            <Footer/>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <RootLayout/>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;