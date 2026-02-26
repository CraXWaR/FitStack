import React, {useState} from "react";

import type {ISet, IWorkoutExercise} from "../../../types/exercise.ts";

import {calcVolume} from "../../../helpers/calcVolume.ts";
import {useLatestSets} from "../../../hooks/exercises/useLatestSets.ts";

import SetsGrid from "./SetsGrid/SetsGrid.tsx";
import AddSetModal from "../AddSetModal/AddSetModal.tsx";

import styles from "./ExerciseCard.module.css";

interface ExerciseCardProps {
    workoutExercise: IWorkoutExercise;
    index: number;
    newSetIds: Record<string, { id: string; date: string }[]>;
    onAddSet: (weId: string, reps: number, weight: number) => void;
}

const bestWeight = (sets: ISet[]): number =>
    sets.reduce((max, set) => (set.weight > max ? set.weight : max), 0);

const ExerciseCard: React.FC<ExerciseCardProps> = ({workoutExercise, index, onAddSet, newSetIds}) => {
    const [showModal, setShowModal] = useState(false);
    const {exercise, sets} = workoutExercise;
    const vol = calcVolume(sets);
    const best = bestWeight(sets);

    const {latestAddedSets, latestOriginalSets} = useLatestSets(workoutExercise, newSetIds);

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
                            <span className={styles.kpiVal}>{vol > 0 ? (vol / 1000).toFixed(1) : "—"}
                                <span className={styles.kpiUnit}>{vol > 0 ? "t" : ""}</span>
                            </span>
                            <span className={styles.kpiLbl}>vol</span>
                        </div>
                    </div>
                </header>

                <div className={styles.setsBody}>
                    {latestOriginalSets.length + latestAddedSets.length === 0
                        ? <p className={styles.emptySets}>No sets logged yet</p>
                        : <SetsGrid originalSets={latestOriginalSets} addedSets={latestAddedSets}/>}
                </div>

                <button type="button" className={styles.logBtn} onClick={() => setShowModal(true)}>
                    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Log Set
                </button>
            </article>

            {showModal && (
                <AddSetModal
                    exerciseName={exercise.name}
                    currentSets={latestAddedSets.length}
                    onClose={() => setShowModal(false)}
                    onAdd={(reps, weight) => onAddSet(workoutExercise.id, reps, weight)}
                />
            )}
        </>
    );
};

export default ExerciseCard