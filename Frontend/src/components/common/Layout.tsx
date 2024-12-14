import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="min-h-[90vh]">{children}</div>
    </>
  );
};

export default Layout;
