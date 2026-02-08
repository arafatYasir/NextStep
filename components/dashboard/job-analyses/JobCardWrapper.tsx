"use client";

import { use } from "react";
import JobCard from "./JobCard";


const JobCardWrapper = ({ jobPromise }: { jobPromise: Promise<any>}) => {
    const data = use(jobPromise);

    if (!data) return null;

    return (
        <JobCard
            id={data._id}
            jobRole={data.jobRole}
            status={data.status}
            analysis={data.result}
            createdAt={data.createdAt}
        />
    );
};

export default JobCardWrapper;
