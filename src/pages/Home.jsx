import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">

        <h1 className="home-title">
          Build. Automate. Scale.
        </h1>

        <p className="home-subtitle">
          Empowering businesses in the U.S. & Africa with modern software solutions.
        </p>

        <Link to="/services" className="home-cta">
          Get Started
        </Link>

      </div>
    </div>
  );
}

export default Home;
