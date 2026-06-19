"use client";

import { use } from "react";
import { CoverLetter } from "@/types/global";
import LetterCard from "./LetterCard";

const LetterCardWrapper = ({ letterPromise }: { letterPromise: Promise<(CoverLetter & { _id: string }) | null> }) => {
    const data = use(letterPromise);

    if (!data) return null;

    return (
        <LetterCard
            id={data._id}
            jobTitle={data.jobTitle}
            companyName={data.companyName}
            status={data.status}
            letter={data}
            createdAt={data.createdAt}
        />
    );
};

export default LetterCardWrapper;
