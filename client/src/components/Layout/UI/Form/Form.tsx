import styles from "./Form.module.css"
import Button from "../Button/Button.tsx";
import type {IFormProps} from "../../../../types/form.ts";

const Form = ({title, onSubmit, submitText, error, success, footer, children, submitting,}: IFormProps) => {
    return (
        <div className={styles.formCard}>
            <h1 className={styles.title}>{title}</h1>
            {/*TODO USE ERROR COMPONENT*/}
            {error && <div className={styles.formError}>{error}</div>}
            {success && <div className={styles.formSuccess}>{success}</div>}

            <form onSubmit={onSubmit}>
                {children}

                <div className={"border-t border-gray-700 pt-4 justify-center flex"}>
                    <Button
                        type="submit"
                        className={"w-full"}
                        variant="primary"
                        disabled={submitting}>
                        {submitting ? "Submitting..." : submitText}
                    </Button>
                </div>
            </form>

            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
}

export default Form;