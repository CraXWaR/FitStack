import React, {useState} from "react";
import {workoutService} from "../services/workoutService.ts";
import {useAuthContext} from "../context/AuthContext.tsx";

const DumbPlaceholderComponent: React.FC = () => {
    const { token } = useAuthContext();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [exerciseId, setExerciseId] = useState("");
    const [sets, setSets] = useState([{ reps: 10, weight: 0 }]);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSetChange = (index: number, field: "reps" | "weight", value: number) => {
        const newSets = [...sets];
        newSets[index][field] = value;
        setSets(newSets);
    };

    const addSet = () => setSets([...sets, { reps: 0, weight: 0 }]);
    const removeSet = (index: number) => setSets(sets.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return alert("You must be logged in");

        setLoading(true);
        setError(null);

        try {
            const workout = await workoutService.createWorkout(token, {
                name,
                date,
                exercises: [
                    {
                        exerciseId,
                        sets,
                    },
                ],
            });

            setResult(workout);
            setName("");
            setDate("");
            setExerciseId("");
            setSets([{ reps: 10, weight: 0 }]);
        } catch (err: any) {
            setError(err.message || "Failed to create workout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-6">Log Workout</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                <div>
                    <label className="block text-gray-300 mb-1">Workout Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 rounded bg-gray-800 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-1">Date & Time</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 rounded bg-gray-800 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-1">Exercise ID</label>
                    <input
                        type="text"
                        value={exerciseId}
                        onChange={(e) => setExerciseId(e.target.value)}
                        className="p-2 rounded bg-gray-800 w-full"
                        required
                    />
                </div>

                <div className="mt-4">
                    <h3 className="text-gray-200 mb-2 font-semibold">Sets</h3>
                    {sets.map((s, i) => (
                        <div key={i} className="flex gap-2 items-center mb-2">
                            <div>
                                <label className="block text-gray-400 text-sm">Reps</label>
                                <input
                                    type="number"
                                    value={s.reps}
                                    onChange={(e) => handleSetChange(i, "reps", Number(e.target.value))}
                                    className="p-2 rounded bg-gray-700 w-20"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm">Weight (kg)</label>
                                <input
                                    type="number"
                                    value={s.weight}
                                    onChange={(e) => handleSetChange(i, "weight", Number(e.target.value))}
                                    className="p-2 rounded bg-gray-700 w-20"
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => removeSet(i)}
                                className="bg-red-600 px-2 py-1 rounded text-white mt-5"
                            >
                                X
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSet}
                        className="bg-green-600 px-4 py-2 rounded text-white mt-2"
                    >
                        Add Set
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 p-2 rounded mt-6 hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Logging..." : "Log Workout"}
                </button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {result && (
                <div className="bg-gray-800 p-4 rounded mt-6 w-full max-w-md overflow-auto">
                    <h3 className="font-semibold mb-2">Workout Logged:</h3>
                    <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default DumbPlaceholderComponent;