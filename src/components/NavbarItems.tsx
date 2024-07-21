import React from 'react';

interface NavItemProps {
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ text }) => {
  return <div className='mr-10'>{text}</div>;
};

export default NavItem;