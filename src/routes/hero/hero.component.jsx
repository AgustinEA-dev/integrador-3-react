import { Link } from "react-router-dom";

import "./hero.styles.scss";
import "../../animations.scss"

const Hero = () => {
  return (
    <div className="hero">
      <div className="image-container">
        <Link to={"/shop"}>
          <img className="logo" src="greco-white.png" alt="greco-white.png" />
        </Link>
      </div>
      {/* <div className="shop-link-container">
        <Link className="shop-link">
          <span>SHOP</span>
        </Link>
      </div> */}
      <div className="hero-text-container">
        <Link className="about-link" to={"/about"}>
          <span>Know more about us</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
