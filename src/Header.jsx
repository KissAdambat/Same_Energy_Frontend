import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <div className="logo">SAMEENERGY</div>
      <nav>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/shop">SHOP</NavLink>
        <NavLink to="/brands">BRANDS</NavLink>
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
        <NavLink to="/login">LOGIN</NavLink>
      </nav>
      <div className="cart">CART (<span id="cart-count">0</span>)</div>
    </header>
  )
}