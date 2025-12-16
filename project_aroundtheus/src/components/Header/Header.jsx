//IMAGE IMPORTS
import logo from "../../assets/logo-white.svg";

//STYLES IMPORTS
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="header">
        <img className="header__logo" src={logo} alt="AroundTheUs Logo" />
      </div>
    </header>
  );
}
export default Header;
