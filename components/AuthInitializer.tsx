"use client";
import { fetchUserAndSubscription } from "@/src/store/features/authSlice";
import { useAppDispatch } from "@/src/store/hooks";
import { useEffect } from "react";

const AuthInitializer = () => {
    const dispatch = useAppDispatch();

    // Fetching user and subscription data
    useEffect(() => {
        dispatch(fetchUserAndSubscription());
    }, [dispatch]);
    
    return null;
}

export default AuthInitializer