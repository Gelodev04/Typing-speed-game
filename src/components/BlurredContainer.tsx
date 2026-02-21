import { type ReactNode } from "react";

interface BlurredContainerProps {
  children: ReactNode;
}

export function BlurredContainer({ children }: BlurredContainerProps) {
  return (
    <div className="bg-[#302f2f] bg-opacity-60 backdrop-blur-xl w-full py-8 px-8 rounded-md text-center">
      {children}
    </div>
  );
}
