"use client";
import React, { useState } from 'react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-4 right-4">
      <button onClick={toggleDropdown} className="w-10 h-10">
        <img className="w-full h-full rounded-full cursor-pointer" src="/Profile.jpg" alt="Profile" />
      </button>
      {isOpen && (
        <div className="absolute right-0 w-30 bg-gray-800 text-white rounded-lg shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700">View Profile</li>
            <li className="px-4 py-2 hover:bg-gray-700">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-700">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}
