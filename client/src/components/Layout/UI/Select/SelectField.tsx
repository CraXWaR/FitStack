import React, {useState, useRef, useEffect} from "react";
import styles from "./SelectField.module.css";
import {FaChevronDown} from "react-icons/fa";

interface ISelectFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}

const SelectField: React.FC<ISelectFieldProps> = ({
                                                      label,
                                                      value,
                                                      onChange,
                                                      options,
                                                      placeholder,
                                                      disabled = false,
                                                  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleSelect = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div
                className={`${styles.inputWrapper} ${isOpen ? styles.active : ""} ${disabled ? styles.disabled : ""}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}>
                <span className={`${styles.selectedValue} ${value ? styles.hasValue : ""}`}>
                    {value ? options.find((option) => option.value === value)?.label : placeholder || label}
                </span>
                <FaChevronDown className={styles.icon}/>
            </div>

            {isOpen && (
                <ul className={styles.dropdown}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleSelect(option.value)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectField;
