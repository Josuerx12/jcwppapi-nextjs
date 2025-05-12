import React from "react";
import { Skeleton } from "../ui/skeleton";

const PreRegisterSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-4 w-[160px]" />
        <Skeleton className="h-4 w-[140px]" />
      </div>
      <Skeleton className="h-10 w-36 rounded-md" />
    </div>
  );
};

export default PreRegisterSkeleton;
