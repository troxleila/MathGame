import "./Header.css";
import HomeButton from "./HomeButton";
import LogoImg from "./math_logo.jpg";

const Header = (modalOpen) => {
  return (
    <div className={modalOpen ? "globalNav dim" : "globalNav"}>
      <nav className="NavbarItems">
        <div className="logo">
          <h3>
            <img src={LogoImg} alt="Random Logo" />
          </h3>
        </div>
        <h1>Equation Dash</h1>

        <div className="actions">
          <div className="navbarButtons">
            <HomeButton hidden={false} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
