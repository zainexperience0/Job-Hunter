import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full py-12">
      <div className="w-full px-36">

      </div>
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default layout;
