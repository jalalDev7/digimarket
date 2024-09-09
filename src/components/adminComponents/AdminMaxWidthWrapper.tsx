import React, { ReactNode } from "react";

const AdminMaxWidthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center max-w-screen-xl mx-auto">
      {children}
    </div>
  );
};

export default AdminMaxWidthWrapper;
