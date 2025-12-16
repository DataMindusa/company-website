import { Link } from "react-router-dom";
import "../styles/services.css";

function Services() {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <p className="services-subtitle">
        We build modern software, automation systems, and business tools to help
        companies operate efficiently and scale faster.
      </p>

      <div className="services-grid">

        <div className="service-card">
          <h2>Custom Software Development</h2>
          <p>
            Web apps, mobile apps, and cloud-based solutions built specifically
            for your business needs.
          </p>
          <Link to="/services/custom-software" className="service-btn">
            Learn More
          </Link>
        </div>

        <div className="service-card">
          <h2>Business Automation</h2>
          <p>
            Automate tasks, streamline workflows, and save time using modern IT
            solutions that eliminate manual work.
          </p>
          <Link to="/services/business-automation" className="service-btn">
            Learn More
          </Link>
        </div>

        <div className="service-card">
          <h2>SaaS Platform Development</h2>
          <p>
            We help entrepreneurs build subscription-based systems like booking
            platforms, POS tools, admin dashboards, and more.
          </p>
          <Link to="/services/saas-development" className="service-btn">
            Learn More
          </Link>
        </div>

        <div className="service-card">
          <h2>Database & Backend Systems</h2>
          <p>
            Secure and scalable database design using MySQL, PostgreSQL, and
            modern backend technologies.
          </p>
          <Link to="/services/database-backend" className="service-btn">
            Learn More
          </Link>
        </div>

        <div className="service-card">
          <h2>IT Consulting</h2>
          <p>
            Get expert guidance on software strategy, infrastructure setup, and
            technical decision-making.
          </p>
          <Link to="/services/it-consulting" className="service-btn">
            Learn More
          </Link>
        </div>

        <div className="service-card">
          <h2>Mobile App Development</h2>
          <p>
            Build cross-platform mobile applications using modern technologies
            like Flutter and React Native.
          </p>
          <Link to="/services/mobile-apps" className="service-btn">
            Learn More
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Services;


