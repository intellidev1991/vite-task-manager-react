import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = React.memo(({}) => {
  useEffect(() => {}, []);

  return (
    <div className="px-10 py-10">
      <Outlet />
    </div>
  );
});

export { Layout };
