import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full mx-auto flex items-center justify-center py-6 flex-col">
      <div className="w-full px-36">
      </div>
      <main className="flex flex-col items-center justify-center h-screen">{children}</main>
    </div>
  );
};

export default layout;
