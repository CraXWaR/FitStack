import React from "react";

import type {IProgram} from "../../../types/program.ts";
import type {IWorkout} from "../../../types/workout.ts";

import ProfileStats from "../../Profile/ProfileStats/ProfileStats.tsx";

import styles from "./ProgramHeader.module.css"

interface ProgramHeaderProps {
    program: IProgram;
    workouts: IWorkout[];
    counter: number;
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({program, workouts, counter}) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <div className={styles.programBadge}>PROGRAM</div>
                <h1 className={styles.programName}>{program.name}</h1>
            </div>

            <div className="grid grid-cols-2 gap-px bg-[#242830] rounded-2xl overflow-hidden w-full sm:w-sm">
                <ProfileStats workouts={workouts.length}
                              counter={counter}
                              counterText={"Exercises"}/>
            </div>
        </header>
    );
}

export default ProgramHeader;