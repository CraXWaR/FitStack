import React from "react";
import UserInfo from "../../components/Profile/UserInfo/UserInfo";
import Stats from "../../components/Profile/Stats/Stats";
import LastWorkout from "../../components/Profile/LastWorkout/LastWorkout";
import {useAuthContext} from "../../context/AuthContext.tsx";
import type {IWorkout} from "../../types/workout.ts";

const ProfilePage: React.FC = () => {
    const {user} = useAuthContext();

    if (!user) return <div>NO USER BRO RELOG!!!</div>;
    //TODO FIX LAST WORKOUT TO SHOW IF NO RELOAD
    const lastWorkout = user.workouts[user.workouts.length - 1];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-10">
            <UserInfo firstName={user.firstName} lastName={user.lastName}
                      email={user.email} profile={user.profile}/>
            <Stats workouts={user.workouts as IWorkout[]}/>
            {lastWorkout && <LastWorkout workout={lastWorkout}/>}
        </div>
    );
};

export default ProfilePage;
