import React, {useState, useRef, useEffect} from "react";
import {FaChevronDown} from "react-icons/fa";
import styles from "./SelectField.module.css";

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
    searchable?: boolean;
}

const SelectField: React.FC<ISelectFieldProps> = ({
                                                      label,
                                                      value,
                                                      onChange,
                                                      options,
                                                      placeholder,
                                                      disabled = false,
                                                      searchable = false,
                                                  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSelect = (value: string) => {
        onChange(value);
        setIsOpen(false);
        setSearchQuery("");
    };

    const handleOpen = () => {
        if (disabled) return;
        setIsOpen(!isOpen);
        if (!isOpen) setSearchQuery("");
    };

    useEffect(() => {
        if (isOpen && searchable) {
            searchRef.current?.focus();
        }
    }, [isOpen, searchable]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = searchable
        ? options.filter((o) =>
            o.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : options;

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div
                className={`${styles.inputWrapper} ${isOpen ? styles.active : ""} ${disabled ? styles.disabled : ""}`}
                onClick={handleOpen}>
                <span className={`${styles.selectedValue} ${value ? styles.hasValue : ""}`}>
                    {value ? options.find((option) => option.value === value)?.label : placeholder || label}
                </span>
                <FaChevronDown className={styles.icon}/>
            </div>

            {isOpen && (
                <ul className={styles.dropdown}>
                    {searchable && (
                        <li className={styles.searchItem}>
                            <input
                                ref={searchRef}
                                className={styles.searchInput}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                onClick={(e) => e.stopPropagation()}
                            />
                        </li>
                    )}
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleSelect(option.value)}>
                            {option.label}
                        </li>
                    ))}
                    {filteredOptions.length === 0 && (
                        <li className={styles.noResults}>No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SelectField;
