import React from "react";

interface ICenterRowBoxProps {
  className?: string;
}

const CenterRowBox: React.FC<ICenterRowBoxProps> = React.memo(({ className, children }) => {
  return <div className={`flex flex-row justify-center items-center ${className}`}>{children}</div>;
});

export { CenterRowBox };
