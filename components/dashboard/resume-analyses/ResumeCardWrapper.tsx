"use client";

import { use } from "react";
import ResumeCard from "./ResumeCard";

const ResumeCardWrapper = ({ resumePromise }: { resumePromise: Promise<any> }) => {
    const data = use(resumePromise);

    if (!data) return null;

    return (
        <ResumeCard
            id={data._id}
            resumeFileName={data.resumeFileName}
            resumeFileType={data.resumeFileType}
            jobTitle={data.jobTitle}
            status={data.status}
            analysis={data.result ?? null}
            createdAt={data.createdAt}
        />
    );
};

export default ResumeCardWrapper;
