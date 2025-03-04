import React from "react";

function Logo({ size = 40, color = "#007FFF", textColor = "#333" }) {
  return (
    <div className="flex items-center space-x-2">
      {/* Logo Icon */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill={color} />
        <text x="50%" y="55%" fontSize="60" fill="white" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
          N
        </text>
      </svg>

      {/* Logo Text */}
      <span style={{ fontSize: size * 0.7, fontWeight: "bold", color: textColor }}>Nexa CRM</span>
    </div>
  );
}

export default Logo;
