import React, {useEffect, useState} from "react";
import UserInfo from "../../components/Profile/UserInfo/UserInfo";
import Stats from "../../components/Profile/Stats/Stats";
import LastWorkout from "../../components/Profile/LastWorkout/LastWorkout";
import type {IWorkout} from "../../types/exercise";

// User types
interface UserProfile {
    weight?: number;
    height?: number;
    age?: number;
    goal?: string;
}

interface User {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    profile?: UserProfile;
    workouts: IWorkout[];
}

// Dummy fetch function
const fetchUserData = async (): Promise<User> => ({
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    profile: {weight: 75, height: 180, age: 28, goal: "Build muscle"},
    workouts: [
        {
            id: "w1",
            name: "Chest Day",
            date: new Date().toISOString(),
            workoutExercises: [
                {
                    id: "we1",
                    exercise: {id: "e1", name: "Bench Press", category: "Chest", sets: []},
                    sets: [
                        {id: "s1", reps: 10, weight: 60},
                        {id: "s2", reps: 8, weight: 70},
                    ],
                },
                {
                    id: "we2",
                    exercise: {id: "e2", name: "Incline Dumbbell Press", category: "Chest", sets: []},
                    sets: [
                        {id: "s3", reps: 12, weight: 25},
                        {id: "s4", reps: 10, weight: 30},
                    ],
                },
            ],
        },
        {
            id: "w2",
            name: "Back Day",
            date: new Date().toISOString(),
            workoutExercises: [
                {
                    id: "we3",
                    exercise: {id: "e3", name: "Pull Ups", category: "Back", sets: []},
                    sets: [
                        {id: "s5", reps: 8, weight: 0},
                        {id: "s6", reps: 6, weight: 0},
                    ],
                },
                {
                    id: "we4",
                    exercise: {id: "e4", name: "Barbell Rows", category: "Back", sets: []},
                    sets: [
                        {id: "s7", reps: 10, weight: 60},
                        {id: "s8", reps: 8, weight: 70},
                    ],
                },
            ],
        },
    ],
});

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUserData().then(setUser);
    }, []);

    if (!user) return <div>Loading...</div>;

    const lastWorkout = user.workouts[user.workouts.length - 1];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-10">
            <UserInfo firstName={user.firstName} lastName={user.lastName} email={user.email} profile={user.profile}/>
            <Stats workouts={user.workouts}/>
            {lastWorkout && <LastWorkout workout={lastWorkout}/>}
        </div>
    );
};

export default ProfilePage;
