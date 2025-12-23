import { NavLink } from "react-router-dom";
import styled from "styled-components";


// Reuse component
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;


function Navbar() {
  return (
    <nav>
      <NavList>
        <li>
          <NavLink to="/home">
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/product">
            <span>Product</span>
          </NavLink>
        </li>

      </NavList>
    </nav>
  );
}

export default Navbar;
