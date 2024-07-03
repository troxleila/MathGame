import "./Header.css";
import HomeButton from "./HomeButton";
import LogoImg from "./temp_math_logo.jpg";

const Header = () => {
  return (
    <div className="globalNav">
      <nav className="NavbarItems">
        <div className="logo">
          <h3>
            <img src={LogoImg} alt="Random Logo" />
          </h3>
        </div>
        <h1>Math Game</h1>

        <div className="actions">
          <div className="navbarButtons">
            <HomeButton hidden={false} />
            {/* <a href="tel:+61 2 8095 8688">+61 2 8095 8688</a> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
