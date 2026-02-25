import React from "react";
import {useNavigate} from "react-router-dom";
import {FiArrowRight} from "react-icons/fi";

import Button from "../../components/Layout/UI/Button/Button.tsx";

import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className={styles.code}>404</span>

                <div className={styles.divider}/>

                <h1 className={styles.title}>Page not found</h1>

                <p className={styles.description}>
                    The page you are trying to access does not exist or has been moved.
                </p>

                <Button variant={"outline"} onClick={() => navigate("/")}>
                    Return home <FiArrowRight/>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;