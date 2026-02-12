import React, {useState} from "react";
import {Calendar} from "primereact/calendar";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primeicons/primeicons.css';
import styles from './DateInputField.module.css'

interface IDateInputFieldProps {
    form: {
        date: string;
        setDate: (value: string) => void;
    };
}

const DateInputField: React.FC<IDateInputFieldProps> = ({form}) => {
    const [floating, setFloating] = useState(false);

    const handleFocusOrClick = () => setFloating(true);

    const handleBlurOrHide = () => {
        if (!form.date) setFloating(false);
    };

    return (
        <div className={styles.wrapper}>
            <label className={`${styles.label} ${form.date || floating ? styles.floating : ""}`}>
                Date & Time
            </label>

            <Calendar
                value={form.date ? new Date(form.date) : null}
                onChange={(e) => form.setDate(e.value ? e.value.toISOString() : "")}
                dateFormat="dd/mm/yy"
                className={styles.calendar}
                inputClassName={styles.input}
                onFocus={handleFocusOrClick}
                onShow={handleFocusOrClick}
                onBlur={handleBlurOrHide}
                onHide={handleBlurOrHide}
            />
        </div>
    );
};

export default DateInputField;
