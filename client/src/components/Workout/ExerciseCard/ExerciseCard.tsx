import React, {useState} from "react";

import type {ISet, IWorkoutExercise} from "../../../types/exercise.ts";

import AddSetModal from "../AddSetModal/AddSetModal.tsx";
import {calcVolume} from "../../../helpers/calcVolume.ts";

import styles from "./ExerciseCard.module.css";

interface ExerciseCardProps {
    workoutExercise: IWorkoutExercise;
    index: number;
    newSetIds: Record<string, string[]>;
    onAddSet: (weId: string, reps: number, weight: number) => void;
}

const bestWeight = (sets: ISet[]): number =>
    sets.reduce((max, set) => (set.weight > max ? set.weight : max), 0);

const ExerciseCard: React.FC<ExerciseCardProps> = ({workoutExercise, index, onAddSet, newSetIds}) => {
    const [showModal, setShowModal] = useState(false);
    const {exercise, sets} = workoutExercise;
    const vol = calcVolume(sets);
    const best = bestWeight(sets);

    const originalSets = workoutExercise.sets.filter(set => !newSetIds[workoutExercise.id]?.includes(set.id));
    const addedSets = workoutExercise.sets.filter(set => newSetIds[workoutExercise.id]?.includes(set.id));
    const hasNewSets = addedSets.length > 0;

    return (
        <>
            <article className={styles.card} style={{animationDelay: `${index * 65}ms`}}>
                <div className={styles.cardAccent}/>

                <header className={styles.cardHeader}>
                    <div className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</div>
                    <div className={styles.cardMeta}>
                        <span className={styles.cardCategory}>{exercise.category}</span>
                        <h3 className={styles.cardName}>{exercise.name}</h3>
                    </div>
                    <div className={styles.cardKpis}>
                        {best > 0 && (
                            <div className={styles.kpi}>
                                <span className={styles.kpiVal}>{best}<span className={styles.kpiUnit}>kg</span></span>
                                <span className={styles.kpiLbl}>best</span>
                            </div>
                        )}
                        <div className={styles.kpi}>
                            <span className={styles.kpiVal}>{vol > 0 ? (vol / 1000).toFixed(1) : "—"}<span
                                className={styles.kpiUnit}>{vol > 0 ? "t" : ""}</span></span>
                            <span className={styles.kpiLbl}>vol</span>
                        </div>
                    </div>
                </header>

                <div className={styles.setsBody}>
                    {sets.length === 0 ? (
                        <p className={styles.emptySets}>No sets logged yet</p>
                    ) : (
                        <div className={styles.setsGrid}>
                            <div className={styles.setsGridHead}>
                                <span>#</span><span>Reps</span><span>Weight</span><span>Vol</span>
                            </div>

                            {originalSets.map((set, index) => (
                                <div key={set.id} className={styles.setsGridRow}
                                     style={{animationDelay: `${index * 65 + index * 35}ms`}}>
                                    <span className={styles.rowIdx}>{index + 1}</span>
                                    <span className={styles.rowNum}>{set.reps}</span>
                                    <span className={styles.rowNum}>{set.weight > 0 ? `${set.weight} kg` :
                                        <span className={styles.bw}>BW</span>}</span>
                                    <span
                                        className={styles.rowVol}>{set.weight > 0 ? (set.reps * set.weight).toLocaleString() : "—"}</span>
                                </div>
                            ))}

                            {hasNewSets && (
                                <div className={styles.sessionDivider}>
                                    <span className={styles.sessionDividerLine}/>
                                    <span className={styles.sessionDividerLabel}>Today</span>
                                    <span className={styles.sessionDividerLine}/>
                                </div>
                            )}

                            {addedSets.map((set, index) => (
                                <div key={set.id} className={`${styles.setsGridRow} ${styles.setsGridRowNew}`}
                                     style={{animationDelay: `${index * 40}ms`}}>
                                    <span className={styles.rowIdxNew}>{index + 1}</span>
                                    <span className={styles.rowNum}>{set.reps}</span>
                                    <span className={styles.rowNum}>{set.weight > 0 ? `${set.weight} kg` :
                                        <span className={styles.bw}>BW</span>}</span>
                                    <span
                                        className={styles.rowVol}>{set.weight > 0 ? (set.reps * set.weight).toLocaleString() : "—"}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className={styles.logBtn}
                    onClick={() => setShowModal(true)}>
                    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Log Set
                </button>
            </article>

            {showModal && (
                <AddSetModal
                    exerciseName={exercise.name}
                    currentSets={addedSets.length}
                    onClose={() => setShowModal(false)}
                    onAdd={(reps, weight) => onAddSet(workoutExercise.id, reps, weight)}
                />
            )}
        </>
    );
};

export default ExerciseCard