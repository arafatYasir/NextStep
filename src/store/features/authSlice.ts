import { createClient } from '@/lib/supabase/client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@supabase/supabase-js'

interface AuthState {
    user: User | null,
    subscriptionPlan: string;
    currentPeriodEnd: Date | null,
    isLoading: boolean,
    error: string
}

export const fetchUserAndSubscription = createAsyncThunk(
    "auth/fetchUserAndSubscription",
    async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { user: null, subscriptionPlan: "", currentPeriodEnd: null }
        }

        // Call subscription fetching api
        const res = await fetch("/api/subscriptions");

        if (!res.ok) {
            throw new Error("Failed to fetch subscription");
        }

        const subscription = await res.json();

        return {
            user,
            subscriptionPlan: subscription.planKey,
            currentPeriodEnd: subscription.currentPeriodEnd
        }
    }
);

const initialState: AuthState = {
    user: null,
    subscriptionPlan: "",
    currentPeriodEnd: null,
    isLoading: false,
    error: ""
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.user = null;
            state.subscriptionPlan = "";
            state.currentPeriodEnd = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAndSubscription.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchUserAndSubscription.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.subscriptionPlan = action.payload.subscriptionPlan;
                state.currentPeriodEnd = action.payload.currentPeriodEnd;
                state.isLoading = false;
            })
            .addCase(fetchUserAndSubscription.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? "Failed to load user data"
            })
    }
})

export const { clearAuth } = authSlice.actions
export default authSlice.reducer