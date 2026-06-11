"use client";

import { use } from "react"
import BuiltResumeCard from "./BuiltResumeCard";

const BuiltResumeCardsWrapper = ({ resumePromise }: { resumePromise: Promise<any> }) => {
    const data = use(resumePromise);

    if (!data) {
        return null;
    }

    return (
        <BuiltResumeCard data={data} />
    )
}

export default BuiltResumeCardsWrapper