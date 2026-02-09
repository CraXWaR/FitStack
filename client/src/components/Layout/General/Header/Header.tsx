import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {FiMenu, FiX} from "react-icons/fi";
import styles from "./Header.module.css"
import {useAuthContext} from "../../../../context/AuthContext.tsx";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const {isLoggedIn, firstName, logout} = useAuthContext();

    const openMenu = () => {
        setIsOpen(true);
    };
    const closeMenu = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            setIsVisible(false);
        }, 250);
    };
    useEffect(() => {
        if (isOpen) {
            setIsVisible(false);
            requestAnimationFrame(() => {
                setIsVisible(true);
            });
        }
    }, [isOpen]);

    return (
        <header className={styles.header}>
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className={styles.logo}>
                    FitStack
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {!isLoggedIn ? (
                        <>
                            <NavLink to="/login"
                                     className={({isActive}) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}>
                                Log in
                            </NavLink>
                            <Link to="/register" className={styles.primary}>
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <div className={styles.authContainer}>
                            <NavLink to="/profile"
                                     className={({isActive}) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}>
                                Profile
                            </NavLink>

                            <NavLink to="/log-workout"
                                     className={({isActive}) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}>
                                Log Workout
                            </NavLink>

                            <div className={styles.divider}/>

                            <div className={styles.userSection}>
                                <span className={styles.greeting}>Hello, {firstName}</span>
                                <button onClick={logout} className={styles.primary}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </nav>


                {/* Mobile toggle */}
                <button className="md:hidden text-(--text-primary)" onClick={openMenu} aria-label="Open menu">
                    <FiMenu size={22}/>
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className={styles.mobileOverlay} onClick={closeMenu}>
                    <div
                        className={`${styles.mobileMenu} ${isVisible && !isClosing ? styles.mobileMenuOpen : styles.mobileMenuClose}`}
                        onClick={(e) => e.stopPropagation()}>
                        <button className={styles.close} onClick={closeMenu}>
                            <FiX size={22}/>
                        </button>

                        <div className="flex flex-col flex-1 mt-8 gap-4">
                            {!isLoggedIn && (
                                <>
                                    <NavLink to="/login"
                                             className={({isActive}) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                                             onClick={closeMenu}>
                                        Log in
                                    </NavLink>
                                    <Link to="/register" className={styles.mobilePrimary} onClick={closeMenu}>Get
                                        Started</Link>
                                </>
                            )}

                            {isLoggedIn && (
                                <>
                                    <NavLink to="/profile"
                                             className={({isActive}) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                                             onClick={closeMenu}>
                                        Profile
                                    </NavLink>

                                    <NavLink to="/log-workout"
                                             className={({isActive}) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                                             onClick={closeMenu}>
                                        Log Workout
                                    </NavLink>

                                    <button onClick={logout} className={styles.mobilePrimary}>
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header