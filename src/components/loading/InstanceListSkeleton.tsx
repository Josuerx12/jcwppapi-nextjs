import React from "react";
import InstanceSkeleton from "./InstanceSkeleton";

const InstanceListSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <InstanceSkeleton key={i} />
      ))}
    </div>
  );
};

export default InstanceListSkeleton;
