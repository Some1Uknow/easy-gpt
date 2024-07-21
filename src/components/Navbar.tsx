import React from "react";
import Logo from "../../commons/Logo";
import NavItem from "./NavbarItems";

interface EasyGPTProps {
  navItems: string[];
}

const EasyGPT: React.FC<EasyGPTProps> = ({ navItems }) => {
  return (
    <header className="flex gap-5 justify-between max-md:flex-wrap items-center">
      <div className="m-2 p-2">
        <Logo />
      </div>
      <nav className="flex text-xl font-medium text-white max-md:flex-wrap max-md:max-w-full">
        {navItems.map((item, index) => (
          <NavItem key={index} text={item} />
        ))}
      </nav>
    </header>
  );
};

export default EasyGPT;
