import React from "react";
import type {ISet} from "../../../../types/exercise.ts";

import styles from "./SetsGrid.module.css"

interface SetsGridProps {
    originalSets: ISet[];
    addedSets: ISet[];
}

const SetsGrid: React.FC<SetsGridProps> = ({originalSets, addedSets}) => (
    <div className={styles.setsGrid}>
        <div className={styles.setsGridHead}>
            <span>#</span>
            <span>Reps</span>
            <span>Weight</span>
            <span>Vol</span>
        </div>

        {originalSets.map((set, index) => (
            <div
                key={set.id}
                className={styles.setsGridRow}
                style={{animationDelay: `${index * 65 + index * 35}ms`}}>
                <span className={styles.rowIdx}>{index + 1}</span>
                <span className={styles.rowNum}>{set.reps}</span>
                <span className={styles.rowNum}>
                    {set.weight > 0 ? `${set.weight} kg` : <span className={styles.bw}>BW</span>}
                </span>
                <span className={styles.rowVol}>
                    {set.weight > 0 ? (set.reps * set.weight).toLocaleString() : "—"}
                </span>
            </div>
        ))}

        {addedSets.length > 0 && (
            <>
                <div className={styles.sessionDivider}>
                    <span className={styles.sessionDividerLine}/>
                    <span className={styles.sessionDividerLabel}>Today</span>
                    <span className={styles.sessionDividerLine}/>
                </div>
                {addedSets.map((set, index) => (
                    <div
                        key={set.id}
                        className={`${styles.setsGridRow} ${styles.setsGridRowNew}`}
                        style={{animationDelay: `${index * 40}ms`}}>
                        <span className={styles.rowIdxNew}>{index + 1}</span>
                        <span className={styles.rowNum}>{set.reps}</span>
                        <span className={styles.rowNum}>
                          {set.weight > 0 ? `${set.weight} kg` : <span className={styles.bw}>BW</span>}
                        </span>
                        <span className={styles.rowVol}>
                          {set.weight > 0 ? (set.reps * set.weight).toLocaleString() : "—"}
                        </span>
                    </div>
                ))}
            </>
        )}
    </div>
);

export default SetsGrid;