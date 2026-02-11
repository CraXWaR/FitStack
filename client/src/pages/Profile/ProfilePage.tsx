import React, {useEffect, useState} from "react";
import UserInfo from "../../components/Profile/UserInfo/UserInfo";
import Stats from "../../components/Profile/Stats/Stats";
import LastWorkout from "../../components/Profile/LastWorkout/LastWorkout";
import type {IUserResponse} from "../../types/user.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";
import {authService} from "../../services/authService.ts";
import type {IWorkout} from "../../types/workout.ts";

const ProfilePage: React.FC = () => {
    const {token} = useAuthContext();
    const [user, setUser] = useState<IUserResponse | null>(null);

    useEffect(() => {
        if (!token) return;
        authService.getUser(token).then(setUser).catch(console.error);
    }, [token]);

    if (!user) return <div>NO USER BRO RELOG!!!</div>;

    const lastWorkout = user.workouts[user.workouts.length - 1];
    const userWithMockProfile: IUserResponse = {
        ...user,
        profile: user.profile ?? {
            weight: 75,
            height: 180,
            age: 25,
            goal: "Build muscle"
        }
    };
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-10">
            <UserInfo firstName={userWithMockProfile.firstName} lastName={userWithMockProfile.lastName}
                      email={userWithMockProfile.email} profile={userWithMockProfile.profile}/>
            <Stats workouts={user.workouts as IWorkout[]}/>
            {lastWorkout && <LastWorkout workout={lastWorkout}/>}
        </div>
    );
};

export default ProfilePage;
