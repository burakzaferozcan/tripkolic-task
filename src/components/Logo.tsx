import React from "react";
import Image from "next/image";

export const Logo: React.FC = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="w-48 h-16 relative">
        <Image
          src="/images/image.png"
          alt="ORCA Softwares Logo"
          fill
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};
