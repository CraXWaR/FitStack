import React, {useState} from "react";

import {FiPlus, FiZap} from "react-icons/fi";

import type {ISet, IWorkoutExercise} from "../../../types/exercise.ts";

import {calcVolume} from "../../../helpers/calcVolume.ts";
import {useLatestSets} from "../../../hooks/exercises/useLatestSets.ts";
import {useAuthContext} from "../../../context/AuthContext.tsx";
import {useAISuggest} from "../../../hooks/ai/useAISuggest.ts";

import SetsGrid from "./SetsGrid/SetsGrid.tsx";
import AddSetModal from "../AddSetModal/AddSetModal.tsx";
import Error from "../../Layout/General/Error/Error.tsx";
import Button from "../../Layout/UI/Button/Button.tsx";

import styles from "./ExerciseCard.module.css";

interface ExerciseCardProps {
    workoutExercise: IWorkoutExercise;
    index: number;
    newSetIds: Record<string, { id: string; date: string }[]>;
    onAddSet: (weId: string, reps: number, weight: number) => void;
}

const bestWeight = (sets: ISet[]): number => sets.reduce((max, set) => (set.weight > max ? set.weight : max), 0);

const ExerciseCard: React.FC<ExerciseCardProps> = ({workoutExercise, index, onAddSet, newSetIds}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalDefaults, setModalDefaults] = useState<{ reps: number; weight: number } | undefined>();

    const {exercise, sets} = workoutExercise;
    const vol = calcVolume(sets);
    const best = bestWeight(sets);

    const {latestAddedSets, latestOriginalSets} = useLatestSets(workoutExercise, newSetIds);
    const validOriginalSets = latestOriginalSets.filter(s => s.reps > 0 || s.weight > 0);

    const {user} = useAuthContext();
    const {suggestion, loading, error, suggest, clear} = useAISuggest();

    const handleSuggest = () => {
        if (validOriginalSets.length === 0) return;
        suggest(
            exercise.name,
            validOriginalSets.map(set => ({reps: set.reps, weight: set.weight})),
            user?.profile?.goal ?? "General Fitness"
        );
    };

    const handleApply = () => {
        if (!suggestion) return;
        setModalDefaults({reps: suggestion.reps, weight: suggestion.weight});
        setShowModal(true);
        clear();
    };

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
                    {latestOriginalSets.filter(s => s.reps > 0 || s.weight > 0).length + latestAddedSets.length === 0
                        ? <p className={styles.emptySets}>No sets logged yet</p>
                        : <SetsGrid originalSets={latestOriginalSets.filter(set => set.reps > 0 || set.weight > 0)}
                                    addedSets={latestAddedSets}/>}
                </div>

                {suggestion && (
                    <div className={styles.aiSuggestion}>
                        <FiZap size={14}/>
                        <div className={styles.aiText}>
                            <strong>{suggestion.reps} reps × {suggestion.weight}kg</strong>
                            <span>{suggestion.reasoning}</span>
                        </div>
                        <Button variant={"outline"} className={styles.aiApply} onClick={handleApply}>
                            Apply
                        </Button>
                    </div>
                )}

                {error && <Error messages={error}/>}

                <div className={styles.cardActions}>
                    <button
                        type="button"
                        className={styles.aiBtn}
                        disabled={loading || validOriginalSets.length === 0}
                        onClick={handleSuggest}>
                        <FiZap size={14}/>
                        {validOriginalSets.length === 0 ? "No history" : loading ? "..." : "AI Suggest"}
                    </button>

                    <button type="button" className={styles.logBtn} onClick={() => {
                        setModalDefaults(undefined);
                        setShowModal(true);
                    }}>
                        <FiPlus size={14}/>
                        Log Set
                    </button>
                </div>
            </article>

            {showModal && (
                <AddSetModal
                    exerciseName={exercise.name}
                    currentSets={latestAddedSets.length}
                    defaultReps={modalDefaults?.reps}
                    defaultWeight={modalDefaults?.weight}
                    onClose={() => setShowModal(false)}
                    onAdd={(reps, weight) => onAddSet(workoutExercise.id, reps, weight)}
                />
            )}
        </>
    );
};

export default ExerciseCard