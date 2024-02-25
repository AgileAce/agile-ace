// File: Issue.js
import React from 'react';

function Issue({ title, distance, friction, relativity, energy, isActive }) {
  // Define a base class
  const baseClass = "issue border rounded-2 mt-2 p-2";
  // Conditionally add an 'active' class
  const activeClass = isActive ? "bg-primary text-light" : "";

  return (
    <div className={`${baseClass} ${activeClass}`}>
      <div className="d-flex align-items-start m-auto flex-column">
        <p><b>{title}</b></p>
        <p>Distance: {distance}</p>
        <p>Friction: {friction}</p>
        <p>Relativity: {relativity}</p>
        <p>Energy: {energy}</p>
      </div>
    </div>
  );
}

export default Issue;
