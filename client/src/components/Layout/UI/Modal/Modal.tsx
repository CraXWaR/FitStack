import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface IModalProps {
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const Modal: React.FC<IModalProps> = ({ title, children, onClose }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [onClose]);

    const modalContent = (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {children}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;
