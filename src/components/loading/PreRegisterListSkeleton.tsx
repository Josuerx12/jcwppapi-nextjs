import React from "react";
import PreRegisterSkeleton from "./PreRegisterSkeleton";

const PreRegisterListSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <PreRegisterSkeleton key={i} />
      ))}
    </div>
  );
};

export default PreRegisterListSkeleton;
