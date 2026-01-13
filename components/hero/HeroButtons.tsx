"use client"

import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const HeroButtons = () => {
    // Extra hooks
    const router = useRouter();

    // Functions
    const handleLandDreamJob = async () => {
        // Checking if the user is logged in
        const supabase = createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        // If user is not logged in redirect to sign-in page
        if (!user) {
            router.push("/sign-in");
            return;
        }

        // If user is logged in redirect to job-analyzer page
        router.push("/tools/job-analyzer");
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-8 font-sans">
                <Button
                    size="lg"
                    className="w-full sm:w-auto text-base h-14 px-10 rounded-full bg-linear-to-r hover:-translate-y-0.5 transition-all group shadow-lg cursor-pointer"
                    onClick={handleLandDreamJob}>
                    Land Your Dream Job
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                </Button>


                <Link href="#how-it-works">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-14 px-10 rounded-full bg-background/50 border-input hover:bg-background/80 hover:text-foreground backdrop-blur-sm transition-all duration-300 cursor-pointer">
                        See How It Works
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default HeroButtons