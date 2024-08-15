"use client";

import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    window.location.href = "/main/job";
  });
  return <div>MainPage</div>;
};

export default MainPage;