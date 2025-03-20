"use client";
import React from "react";

export default function Tooltip({ children, label }) {
  return (
    <div className="group relative">
      {children}
    </div>
  );
}
