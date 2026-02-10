import React, {useEffect, useState} from "react";
import UserInfo from "../../components/Profile/UserInfo/UserInfo";
import Stats from "../../components/Profile/Stats/Stats";
import LastWorkout from "../../components/Profile/LastWorkout/LastWorkout";
import type {IUserResponse} from "../../types/user.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";
import {authService} from "../../services/authService.ts";
import type {IWorkout} from "../../types/exercise.ts";

const ProfilePage: React.FC = () => {
    const {token} = useAuthContext();
    const [user, setUser] = useState<IUserResponse | null>(null);

    useEffect(() => {
        if (!token) return;
        authService.getUser(token).then(setUser).catch(console.error);
    }, [token]);

    if (!user) return <div>NO USER BRO RELOG!!!</div>;

    const lastWorkout = user.workouts[user.workouts.length - 1];
    console.log(lastWorkout);
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-10">
            <UserInfo firstName={user.firstName} lastName={user.lastName} email={user.email} profile={user.profile}/>
            <Stats workouts={user.workouts as IWorkout[]}/>
            {lastWorkout && <LastWorkout workout={lastWorkout}/>}
        </div>
    );
};

export default ProfilePage;
