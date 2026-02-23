import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";

import './App.css'

import Home from "./pages/Home/Home.tsx";
import Header from "./components/Layout/General/Header/Header.tsx";
import Footer from "./components/Layout/General/Footer/Footer.tsx";
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import LogWorkoutPage from "./pages/LogWorkoutPage/LogWorkoutPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import ProfileEditPage from "./pages/Profile/ProfileEditPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProgramWorkoutPage from "./pages/ProgramPage/ProgramPage.tsx";
import WorkoutDetailPage from "./pages/WorkoutPage/WorkoutDetailPage.tsx";

const RootLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>

            <main className="flex-1 flex">
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route path="/log-workout" element={<ProtectedRoute><LogWorkoutPage/></ProtectedRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                    <Route path="/profile/edit" element={<ProtectedRoute><ProfileEditPage/></ProtectedRoute>}/>
                    <Route path="/program/:slug" element={<ProtectedRoute><ProgramWorkoutPage/></ProtectedRoute>}/>
                    <Route path="/program/:slug/:workoutSlug"
                           element={<ProtectedRoute><WorkoutDetailPage/></ProtectedRoute>}/>
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