import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css'

import Home from "./pages/Home/Home.tsx";

const RootLayout: React.FC = () => {
    return (
        <main className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </main>
    );
}

function App() {
    return (
        <BrowserRouter>
            <RootLayout/>
        </BrowserRouter>
    );
}

export default App;