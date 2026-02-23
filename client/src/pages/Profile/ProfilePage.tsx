import React from "react";

import {Link} from "react-router-dom";
import {GoGoal} from "react-icons/go";

import {usePrograms} from "../../hooks/program/usePrograms.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";

import UserProfileInfo from "../../components/Profile/UserProfileInfo/UserProfileInfo.tsx";
import UserPrograms from "../../components/Profile/UserPrograms/UserPrograms.tsx";
import Stats from "../../components/Stats/Stats.tsx";

import styles from "./ProfilePage.module.css";

const ProfilePage: React.FC = () => {
    const {user} = useAuthContext();
    const {programs} = usePrograms();

    //TODO CREATE 404 PAGE
    if (!user) {
        return (<div>no user bro</div>)
    }

    const totalWorkouts = user.workouts?.length ?? 0;
    const totalPrograms = programs?.length ?? 0;

    const avatarInitials = (user.firstName?.[0] ?? "") + (user.lastName ? user.lastName[0] : "");
    const {age, weight, height} = user.profile ?? {};

    return (
        <div className="w-full bg-[#0E0F12] text-[#E6E8EB] font-sans pb-20">
            <div className={styles.hero}>
                <div className={styles.heroBgClip}>
                    <div className={styles.heroGrid}/>
                    <div className={styles.heroGlow}/>
                    <div className={styles.heroAccentLine}/>
                </div>
                <div className={styles.heroInner}>
                    <div className={styles.avatarWrap}>
                        <div className={styles.avatar}>{avatarInitials.toUpperCase()}</div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="mt-16 flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight leading-none text-[#E6E8EB]">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-xs text-[#9AA0A6] mt-1.5 tracking-wide">
                            Member since{" "}
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }) : "—"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            className="flex gap-2 bg-[#3DDC97]/10 border border-[#3DDC97]/30 text-[#3DDC97] text-xs font-medium px-3 py-1.5 rounded-full tracking-wide">
                          <GoGoal size={16}/> {user.profile?.goal}
                        </span>
                        <Link to={'/profile/edit'}
                              className="text-xs text-[#9AA0A6] bg-[#1E2228] border border-[#242830] px-3 py-1.5 rounded-lg hover:border-[#3DDC97]/30 hover:text-[#3DDC97] transition-all">
                            Edit
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-[#242830] rounded-2xl overflow-hidden mt-5">
                    <Stats leftCounter={totalWorkouts} leftText="Workouts" rightCounter={totalPrograms}
                           rightText="Programs"/>
                </div>

                <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-7">
                    <UserProfileInfo age={age} weight={weight} height={height}/>
                    <UserPrograms programs={programs}/>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage