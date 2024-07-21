import Image from "next/image";
import React from "react";

const Logo: React.FC = () => {
  return (
    <>
      <Image
        alt="easyGPT-logo"
        src="/logo.png"
        height={50}
        width={50}
        className="h-16 w-16 rounded-full"
      />
    </>
  );
};

export default Logo;
