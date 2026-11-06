export default function Header() {
  return (
    <header>
      <div className="logo">SAMEENERGY</div>
      <nav>
        <a href="../fooldal/fooldal.html" className="active">HOME</a>
        <a href="../shop/shop.html">SHOP</a>
        <a href="../brand/brand.html">BRANDS</a>
        <a href="../rolunk/rolunk.html">ABOUT</a>
        <a href="../contact/contact.html">CONTACT</a>
        <a href="../login/login.html">LOGIN</a>
      </nav>
      <div className="cart">CART (<span id="cart-count">0</span>)</div>
    </header>
  );
}