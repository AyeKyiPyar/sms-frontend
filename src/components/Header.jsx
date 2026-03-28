import React from 'react';

const Header = () => {
  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      
      {/* Left: Page Title */}
      <h1 className="text-xl font-semibold text-gray-800">
        Student Management System
      </h1>

      {/* Right: User Info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">Admin</p>
          <p className="text-xs text-gray-500">admin@example.com</p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>

    </div>
  );
};

export default Header;
