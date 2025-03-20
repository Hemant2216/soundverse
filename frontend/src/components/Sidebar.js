"use client";
import Tooltip from "./Tooltip";

const menuItems = [
  { icon: <img src="/Logo.png" className="w-10 h-10" alt="Home"/>, label: "Home" },
  { icon: <img src="/Add.png" className="w-6 h-6 cursor-pointer" alt="Home"/>, label: "Add" },
  { icon: <img src="/Home.png" className="w-5 h-5 cursor-pointer" alt="Home"/>, label: "Home" },
  { icon: <img src="/Search.png" className="w-5 h-5 cursor-pointer" alt="Home"/>, label: "Search" },
  { icon: <img src="/Library.png" className="w-4 h-4 cursor-pointer" alt="Home"/>, label: "Library" }
];

export default function Sidebar() {
  return (
    <aside className="w-18 bg-black flex flex-col items-center justify-between py-6 h-auto">
      <div className="flex flex-col items-center">
        {menuItems.map((item, index) => (
          <Tooltip key={index} label={item.label}>
            <button className="mb-6">{item.icon}</button>
          </Tooltip>
        ))}
      </div>
      
      <Tooltip label="Profile">
        <button className="mb-4 pb-15">
          <img src="/Profile.jpg" className="w-10 h-10 rounded-full cursor-pointer" alt="Profile"/>
        </button>
      </Tooltip>
    </aside>
  );
}
