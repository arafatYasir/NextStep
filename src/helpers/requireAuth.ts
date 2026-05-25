import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";

type AuthResult =
    | { user: User; unauthorized: null }
    | { user: null; unauthorized: NextResponse };

export async function requireAuth(): Promise<AuthResult> {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user?.id) {
        return {
            user: null,
            unauthorized: NextResponse.json(
                { status: "ERROR", message: "Unauthorized. Please sign in." },
                { status: 401 }
            ),
        };
    }

    return { user, unauthorized: null };
}
