import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WorkoutDetailPage.module.css";
import AddSetModal from "../../components/Workout/AddSetModal/AddSetModal.tsx";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SetEntry {
    id: string;
    reps: number;
    weight: number;
    workoutExerciseId: string;
    createdAt: string;
}

interface WorkoutExercise {
    id: string;
    exerciseId: string;
    workoutId: string;
    exercise: { id: string; name: string; category: string };
    sets: SetEntry[];
}

interface Workout {
    id: string;
    name: string;
    date: string;
    programId: string;
    programOrder: number;
    userId: string;
    workoutExercises: WorkoutExercise[];
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const DUMMY_WORKOUT: Workout = {
    id: "ff8b73bc-97a5-4ec6-a578-a28d64bd7e5d",
    name: "Upper Body Power",
    date: "2026-02-19T09:00:00.000Z",
    programId: "f68078a7-1c68-4e84-b83a-44e80e733b71",
    programOrder: 3,
    userId: "082a0947-110a-4c40-9c12-247ff6e77bd9",
    workoutExercises: [
        {
            id: "we-001",
            exerciseId: "bench-press-id",
            workoutId: "ff8b73bc-97a5-4ec6-a578-a28d64bd7e5d",
            exercise: { id: "bench-press-id", name: "Bench Press", category: "Chest" },
            sets: [
                { id: "s-001", reps: 8,  weight: 80,  workoutExerciseId: "we-001", createdAt: "2026-02-19T09:05:00.000Z" },
                { id: "s-002", reps: 6,  weight: 90,  workoutExerciseId: "we-001", createdAt: "2026-02-19T09:08:00.000Z" },
                { id: "s-003", reps: 5,  weight: 100, workoutExerciseId: "we-001", createdAt: "2026-02-19T09:12:00.000Z" },
                { id: "s-004", reps: 4,  weight: 105, workoutExerciseId: "we-001", createdAt: "2026-02-19T09:15:00.000Z" },
            ],
        },
        {
            id: "we-002",
            exerciseId: "overhead-press-id",
            workoutId: "ff8b73bc-97a5-4ec6-a578-a28d64bd7e5d",
            exercise: { id: "overhead-press-id", name: "Overhead Press", category: "Shoulders" },
            sets: [
                { id: "s-005", reps: 10, weight: 50, workoutExerciseId: "we-002", createdAt: "2026-02-19T09:25:00.000Z" },
                { id: "s-006", reps: 8,  weight: 55, workoutExerciseId: "we-002", createdAt: "2026-02-19T09:29:00.000Z" },
                { id: "s-007", reps: 6,  weight: 60, workoutExerciseId: "we-002", createdAt: "2026-02-19T09:33:00.000Z" },
            ],
        },
        {
            id: "we-003",
            exerciseId: "pull-up-id",
            workoutId: "ff8b73bc-97a5-4ec6-a578-a28d64bd7e5d",
            exercise: { id: "pull-up-id", name: "Pull-Up", category: "Back" },
            sets: [
                { id: "s-008", reps: 12, weight: 0,  workoutExerciseId: "we-003", createdAt: "2026-02-19T09:42:00.000Z" },
                { id: "s-009", reps: 10, weight: 0,  workoutExerciseId: "we-003", createdAt: "2026-02-19T09:46:00.000Z" },
                { id: "s-010", reps: 8,  weight: 10, workoutExerciseId: "we-003", createdAt: "2026-02-19T09:50:00.000Z" },
            ],
        },
        {
            id: "we-004",
            exerciseId: "tricep-dip-id",
            workoutId: "ff8b73bc-97a5-4ec6-a578-a28d64bd7e5d",
            exercise: { id: "tricep-dip-id", name: "Tricep Dip", category: "Triceps" },
            sets: [
                { id: "s-011", reps: 15, weight: 0,  workoutExerciseId: "we-004", createdAt: "2026-02-19T09:58:00.000Z" },
                { id: "s-012", reps: 12, weight: 10, workoutExerciseId: "we-004", createdAt: "2026-02-19T10:02:00.000Z" },
            ],
        },
    ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

const calcVolume = (sets: SetEntry[]): number =>
    sets.reduce((acc, s) => acc + s.reps * s.weight, 0);

const totalVolume = (exercises: WorkoutExercise[]): number =>
    exercises.reduce((acc, we) => acc + calcVolume(we.sets), 0);

const bestWeight = (sets: SetEntry[]): number =>
    sets.reduce((max, s) => (s.weight > max ? s.weight : max), 0);

// ─── Exercise Card ────────────────────────────────────────────────────────────
interface ExerciseCardProps {
    workoutExercise: WorkoutExercise;
    index: number;
    newSetsFrom: number; // index where newly added sets start (original sets end)
    onAddSet: (weId: string, reps: number, weight: number) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ workoutExercise, index, newSetsFrom, onAddSet }) => {
    const [showModal, setShowModal] = useState(false);
    const { exercise, sets } = workoutExercise;
    const vol = calcVolume(sets);
    const best = bestWeight(sets);

    const originalSets = sets.slice(0, newSetsFrom);
    const addedSets = sets.slice(newSetsFrom);
    const hasNewSets = addedSets.length > 0;

    return (
        <>
            <article
                className={styles.card}
                style={{ animationDelay: `${index * 65}ms` }}>
                {/* Accent bar */}
                <div className={styles.cardAccent} />

                {/* Card header */}
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
                            <span className={styles.kpiVal}>{vol > 0 ? (vol / 1000).toFixed(1) : "—"}<span className={styles.kpiUnit}>{vol > 0 ? "t" : ""}</span></span>
                            <span className={styles.kpiLbl}>vol</span>
                        </div>
                    </div>
                </header>

                {/* Sets */}
                <div className={styles.setsBody}>
                    {sets.length === 0 ? (
                        <p className={styles.emptySets}>No sets logged yet</p>
                    ) : (
                        <div className={styles.setsGrid}>
                            <div className={styles.setsGridHead}>
                                <span>#</span><span>Reps</span><span>Weight</span><span>Vol</span>
                            </div>

                            {/* Original / previous sets */}
                            {originalSets.map((set, i) => (
                                <div key={set.id} className={styles.setsGridRow} style={{ animationDelay: `${index * 65 + i * 35}ms` }}>
                                    <span className={styles.rowIdx}>{i + 1}</span>
                                    <span className={styles.rowNum}>{set.reps}</span>
                                    <span className={styles.rowNum}>{set.weight > 0 ? `${set.weight} kg` : <span className={styles.bw}>BW</span>}</span>
                                    <span className={styles.rowVol}>{set.weight > 0 ? (set.reps * set.weight).toLocaleString() : "—"}</span>
                                </div>
                            ))}

                            {/* Divider + "Today" label when new sets exist */}
                            {hasNewSets && (
                                <div className={styles.sessionDivider}>
                                    <span className={styles.sessionDividerLine} />
                                    <span className={styles.sessionDividerLabel}>Today</span>
                                    <span className={styles.sessionDividerLine} />
                                </div>
                            )}

                            {/* Newly added sets — counter restarts from 1 */}
                            {addedSets.map((set, i) => (
                                <div key={set.id} className={`${styles.setsGridRow} ${styles.setsGridRowNew}`} style={{ animationDelay: `${i * 40}ms` }}>
                                    <span className={styles.rowIdxNew}>{i + 1}</span>
                                    <span className={styles.rowNum}>{set.reps}</span>
                                    <span className={styles.rowNum}>{set.weight > 0 ? `${set.weight} kg` : <span className={styles.bw}>BW</span>}</span>
                                    <span className={styles.rowVol}>{set.weight > 0 ? (set.reps * set.weight).toLocaleString() : "—"}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <button
                    type="button"
                    className={styles.logBtn}
                    onClick={() => setShowModal(true)}>
                    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

// ─── Page ─────────────────────────────────────────────────────────────────────
const WorkoutDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const [workout, setWorkout] = useState<Workout>(DUMMY_WORKOUT);

    // Track where the "new session" sets start for each exercise (original set count at page load)
    const [newSetsFrom] = useState<Record<string, number>>(() =>
        Object.fromEntries(
            DUMMY_WORKOUT.workoutExercises.map((we) => [we.id, we.sets.length])
        )
    );

    const handleAddSet = (weId: string, reps: number, weight: number) => {
        const newSet: SetEntry = {
            id: crypto.randomUUID(),
            reps, weight,
            workoutExerciseId: weId,
            createdAt: new Date().toISOString(),
        };
        setWorkout((prev) => ({
            ...prev,
            workoutExercises: prev.workoutExercises.map((we) =>
                we.id === weId ? { ...we, sets: [...we.sets, newSet] } : we
            ),
        }));
    };

    const vol = totalVolume(workout.workoutExercises);

    return (
        <div className={styles.page}>
            <div className={styles.bgGlow} />

            <div className={styles.wrap}>

                {/* Nav */}
                <nav className={styles.nav}>
                    <button type="button" className={styles.back} onClick={() => navigate(-1)}>
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                            <path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </button>
                </nav>

                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroLeft}>
                        <time className={styles.heroDate}>{formatDate(workout.date)}</time>
                        <h1 className={styles.heroTitle}>{workout.name}</h1>
                    </div>

                    <dl className={styles.heroMetrics}>
                        <div className={styles.metric}>
                            <dd className={styles.metricVal}>{workout.workoutExercises.length}</dd>
                            <dt className={styles.metricKey}>Exercises</dt>
                        </div>
                        <div className={styles.metricDivider} />
                        <div className={styles.metric}>
                            <dd className={styles.metricVal}>{vol > 0 ? `${(vol / 1000).toFixed(1)}t` : "—"}</dd>
                            <dt className={styles.metricKey}>Volume</dt>
                        </div>
                    </dl>
                </section>

                {/* Cards grid */}
                <div className={styles.grid}>
                    {workout.workoutExercises.map((we, i) => (
                        <ExerciseCard
                            key={we.id}
                            workoutExercise={we}
                            index={i}
                            newSetsFrom={newSetsFrom[we.id] ?? we.sets.length}
                            onAddSet={handleAddSet}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default WorkoutDetailPage;