import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import type {IProfile} from "../../types/profile.ts";
import {authService} from "../../services/authService.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";

export const useProfileEdit = () => {
    const {user, setUser, token} = useAuthContext();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({firstName: "", lastName: ""});
    const [profileData, setProfileData] = useState<IProfile>({
        weight: null,
        height: null,
        age: null,
        goal: null,
    });
    const [error, setError] = useState<React.ReactNode>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!user) return;

        setUserData({
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
        });

        setProfileData({
            weight: user.profile?.weight ?? null,
            height: user.profile?.height ?? null,
            age: user.profile?.age ?? null,
            goal: user.profile?.goal ?? null,
        });
    }, [user]);

    const formatNumberInput = (value: number | null | undefined) => (value == null ? "" : value);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            if (!token) throw new Error("Missing authentication token");

            const payload: IProfile = Object.fromEntries(
                Object.entries(profileData).map(([key, value]) => [key, value === null ? undefined : value])
            ) as IProfile;

            const updatedData = {
                firstName: userData.firstName,
                lastName: userData.lastName?.trim() || undefined,
                profile: payload,
            };

            const response = await authService.updateUser(token, updatedData);

            setUser(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    firstName: response.user.firstName,
                    lastName: response.user.lastName,
                    profile: response.user.profile,
                    workouts: prev.workouts,
                };
            });

            navigate("/profile");
        } catch (err: any) {
            console.error(err);
            setError(Array.isArray(err) ? err.join(", ") : err.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return {
        userData,
        setUserData,
        profileData,
        setProfileData,
        error,
        submitting,
        handleSubmit,
        formatNumberInput,
    };
};
