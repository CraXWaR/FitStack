import React from "react";
import styles from "./UserInfo.module.css";

interface UserProfile {
    weight?: number;
    height?: number;
    age?: number;
    goal?: string;
}

interface UserInfoProps {
    firstName: string;
    lastName?: string;
    email: string;
    profile?: UserProfile;
}

const UserInfo: React.FC<UserInfoProps> = ({firstName, lastName, email, profile}) => {
    return (
        <section className={`flex flex-col md:flex-row items-center justify-between ${styles.profileCard}`}>
            <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-accent-main">{firstName} {lastName}</h1>
                <p className="text-text-secondary mt-2">{email}</p>
                {profile?.goal && <span className={styles.goalBadge}>{profile.goal}</span>}
            </div>
            {profile && (
                <div className="mt-6 md:mt-0 flex gap-8 text-center">
                    <div>
                        <p className="text-text-secondary text-sm">Weight</p>
                        <p className="font-bold text-xl text-accent-main">{profile.weight ?? "-"} kg</p>
                    </div>
                    <div>
                        <p className="text-text-secondary text-sm">Height</p>
                        <p className="font-bold text-xl text-accent-main">{profile.height ?? "-"} cm</p>
                    </div>
                    <div>
                        <p className="text-text-secondary text-sm">Age</p>
                        <p className="font-bold text-xl text-accent-main">{profile.age ?? "-"}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UserInfo;
