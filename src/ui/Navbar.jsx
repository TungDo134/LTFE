import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Reuse component
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const CartBadge = styled.span`
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 6px;
`;

function Navbar() {
    const cartCount = useSelector((state) =>
        state.cart.list.reduce((sum, item) => sum + item.quantity, 0)
    );
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

          <li>
              <NavLink to="/cart">
            <span>
              Cart
                {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
            </span>
              </NavLink>
          </li>

      </NavList>
    </nav>
  );
}

export default Navbar;
