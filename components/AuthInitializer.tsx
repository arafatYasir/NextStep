"use client";
import { createClient } from "@/lib/supabase/client";
import { clearAuth, fetchUserAndSubscription } from "@/src/store/features/authSlice";
import { useAppDispatch } from "@/src/store/hooks";
import { useEffect } from "react";

const AuthInitializer = () => {
    const dispatch = useAppDispatch();

    // Fetching user and subscription data
    useEffect(() => {
        dispatch(fetchUserAndSubscription())

        const supabase = createClient();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                dispatch(fetchUserAndSubscription());
            }
            if (event === 'SIGNED_OUT') {
                dispatch(clearAuth());
            }
        })

        return () => subscription.unsubscribe();
    }, [dispatch])

    return null;
}

export default AuthInitializer