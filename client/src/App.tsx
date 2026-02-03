import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";

import './App.css'

import Home from "./pages/Home/Home.tsx";
import Header from "./components/Layout/General/Header/Header.tsx";
import Footer from "./components/Layout/General/Footer/Footer.tsx";
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import DumbPlaceholderComponent from "./components/DumbPlaceholderComponent.tsx";
import LogWorkoutPage from "./pages/LogWorkoutPage/LogWorkoutPage.tsx";

const RootLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>

            <main className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl bg-bg-surface rounded-2xl p-8 shadow-lg flex flex-col gap-6">
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/log-workout" element={<LogWorkoutPage/>}/>

                    {/*test route*/}
                    <Route path="/testDumb" element={<DumbPlaceholderComponent/>} />
                </Routes>
                </div>
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