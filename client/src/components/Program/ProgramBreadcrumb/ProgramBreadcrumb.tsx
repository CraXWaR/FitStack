import React from "react";

import {Link} from "react-router-dom";

import styles from "./ProgramBreadcrumb.module.css";

interface ProgramBreadcrumbProps {
    programName: string;
}

const ProgramBreadcrumb: React.FC<ProgramBreadcrumbProps> = ({programName}) => {
    return (
        <nav className={styles.breadcrumb}>
            <Link to={"/profile"} className={styles.breadcrumbLink}>Profile</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{programName}</span>
        </nav>
    );
}

export default ProgramBreadcrumb;