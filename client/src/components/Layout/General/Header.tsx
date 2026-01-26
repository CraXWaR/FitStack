import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Header.module.css"

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

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
                    <Link to="/login" className={styles.link}>
                        Log in
                    </Link>
                    <Link to="/register" className={styles.primary}>
                        Get started
                    </Link>
                </nav>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-(--text-primary)"
                    onClick={openMenu}
                    aria-label="Open menu">
                    <FiMenu size={22} />
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className={styles.mobileOverlay} onClick={closeMenu}>
                    <div
                        className={`${styles.mobileMenu} ${
                            isVisible && !isClosing
                                ? styles.mobileMenuOpen
                                : styles.mobileMenuClose
                        }`}
                        onClick={(e) => e.stopPropagation()}>
                        <button className={styles.close} onClick={closeMenu}>
                            <FiX size={22} />
                        </button>

                        <nav className="flex flex-col gap-4 mt-8 flex-1">
                            <Link to="/login" className={styles.mobileLink} onClick={closeMenu}>
                                Log in
                            </Link>
                            <Link to="#" className={styles.mobilePrimary} onClick={closeMenu}>
                                Get started
                            </Link>
                        </nav>
                    </div>
                </div>
            )}

        </header>
    );
}

export default Header