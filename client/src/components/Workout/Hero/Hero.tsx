import type {IWorkoutExercise} from "../../../types/exercise.ts";
import type {IWorkout} from "../../../types/workout.ts";

import {calcVolume} from "../../../helpers/calcVolume.ts";
import {formatFullDate} from "../../../helpers/dateFormat.ts";

import Stats from "../../Stats/Stats.tsx";

import styles from "./Hero.module.css";

const totalVolume = (exercises: IWorkoutExercise[]): number =>
    exercises.reduce((acc, we) => acc + calcVolume(we.sets), 0);

interface HeroProps {
    workout: IWorkout;
}

const Hero = ({workout}: HeroProps) => {
    const vol = totalVolume(workout.workoutExercises);

    return (<section className={styles.hero}>
        <div className={styles.heroLeft}>
            <time className={styles.heroDate}>{formatFullDate(workout.date)}</time>
            <h1 className={styles.heroTitle}>{workout.name}</h1>
        </div>

        <div className="grid grid-cols-2 gap-px bg-[#242830] rounded-2xl overflow-hidden mt-5">
            <Stats leftCounter={workout.workoutExercises.length} leftText={"Exercises"}
                   rightCounter={vol > 0 ? `${(vol / 1000).toFixed(1)}t` : "—"} rightText={"Volume"}/>
        </div>

    </section>);
}

export default Hero