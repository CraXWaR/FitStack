import React, {useRef, useEffect, useState} from "react";
import styles from "./WorkoutExercise.module.css";
import type {IWorkoutExerciseProps} from "../../../types/props.ts";

const WorkoutExercise: React.FC<IWorkoutExerciseProps> = ({exerciseData, isOpen, onToggle}) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen, exerciseData.sets.length]);

    return (
        <div className="mb-5 border-b border-border-subtle pb-3">
            <button className={styles.workoutExerciseButton} onClick={onToggle}>
                <span className="text-start">{exerciseData.exercise.name} ({exerciseData.exercise.category})</span>
                <span className="text-accent-main text-2xl">{isOpen ? "−" : "+"}</span>
            </button>

            <div
                ref={contentRef}
                style={{height: isOpen ? `${height}px` : "0px"}}
                className="overflow-hidden transition-[height] duration-400 ease-in-out">
                <ul className={styles.setList}>
                    {exerciseData.sets.map(s => (
                        <li key={s.id}>{s.reps} reps × {s.weight} kg</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WorkoutExercise;