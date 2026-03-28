import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
 return (
  <div className="flex min-h-screen bg-gray-100">

    {/* Sidebar */}
    <Sidebar className="w-64" /> {/* fixed width for sidebar */}

    {/* Main Content */}
    <div className="flex-1 flex flex-col">

      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Outlet renders the current page (Teachers, Students, etc.) */}
        <div className="max-w-full w-full">
          <Outlet />
        </div>
      </main>

    </div>
  </div>
);

};

export default Layout;
