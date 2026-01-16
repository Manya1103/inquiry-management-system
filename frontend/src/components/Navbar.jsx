import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Boxes } from 'lucide-react';
import tw from "tailwind-styled-components";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <NavContainer>
      <Wrapper>
        <Logo to="/">
          <Boxes size={24} className="text-blue-600" />
          <BrandText>Kyrex<span className="text-blue-600">IMS</span></BrandText>
        </Logo>
        
        <NavLinks>
          <NavLink to="/" $active={isActive('/')}>
            <PlusCircle size={18} />
            <span>New Inquiry</span>
          </NavLink>
          <NavLink to="/inquiries" $active={isActive('/inquiries')}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
        </NavLinks>
      </Wrapper>
    </NavContainer>
  );
};

export default Navbar;

/* --- Styled Components --- */

const NavContainer = tw.nav`
  sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200
`;

const Wrapper = tw.div`
  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between
`;

const Logo = tw(Link)`
  flex items-center gap-2 hover:opacity-80 transition-opacity
`;

const BrandText = tw.span`
  font-bold text-xl tracking-tight text-gray-900
`;

const NavLinks = tw.div`
  flex gap-2
`;

const NavLink = tw(Link)`
  ${(p) => (p.$active ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")}
  flex items-center gap-2 px-1 py-2 rounded-full text-sm font-medium transition-all duration-200
`;