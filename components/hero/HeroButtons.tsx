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
        const { data: { user } } = await supabase.auth.getUser();

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
            <div className="flex justify-center items-center whitespace-nowrap flex-wrap gap-4 w-full sm:w-auto mt-8 font-sans">
                <Button
                    size="lg"
                    className="text-base h-12 sm:h-14 sm:px-10 rounded-full hover:-translate-y-0.5 group shadow-lg cursor-pointer"
                    onClick={handleLandDreamJob}>
                    Land Your Dream Job
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                </Button>


                <Link href="#how-it-works">
                    <Button variant="secondary" size="lg" className="text-base h-12 sm:h-14 sm:px-10 rounded-full text-foreground shadow-lg">
                        See How It Works
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default HeroButtons