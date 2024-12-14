import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={`max-w-[1380px] w-full mx-auto p-1 ${className} `}>
      {children}
    </div>
  );
};

export default Container;
