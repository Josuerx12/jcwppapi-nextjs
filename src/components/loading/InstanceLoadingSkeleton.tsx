import React from "react";
import { Skeleton } from "../ui/skeleton";

const InstanceLoadingSkeleton = () => {
  return (
    <div className="w-full">
      <h2>
        <Skeleton className="h-4 w-[200px] mx-auto" />
      </h2>
      <div className="flex flex-col gap-y-4 p-2">
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <div key={i} className="flex justify-between w-full space-x-4">
              <div className="flex flex-col gap-y-4">
                <Skeleton className="h-4 w-[300px] mt-2" />
                <Skeleton className="h-4 w-[300px] mt-2" />
              </div>
              <Skeleton className="h-36 w-36 rounded" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstanceLoadingSkeleton;
