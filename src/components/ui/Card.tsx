import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, rightIcon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-800">{title}</h3>
          {rightIcon && <div>{rightIcon}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
