import { useParams, Link } from "react-router-dom";
import "../../styles/services.css";

function ServiceDetail() {
  const { serviceSlug } = useParams();

  const services = {
    "custom-software": {
      title: "Custom Software Development",
      description:
        "We design and build custom software solutions tailored to your business needs. From internal tools to enterprise systems, our solutions are scalable, secure, and built for long-term growth.",
      offers: [
        "Custom web & mobile applications",
        "Enterprise software solutions",
        "API integrations",
        "Scalable cloud-ready architecture"
      ],
      forWho: "Businesses that need tailored software solutions instead of off-the-shelf tools.",
      tech: "React, Java, Spring Boot, MySQL, Cloud Services"
    },

    "business-automation": {
      title: "Business Automation",
      description:
        "We automate workflows, eliminate repetitive tasks, and integrate systems to help businesses operate faster and smarter.",
      offers: [
        "Workflow automation",
        "System integrations",
        "Process optimization",
        "Data automation & reporting"
      ],
      forWho: "Businesses looking to reduce manual work and improve efficiency.",
      tech: "Python, Zapier, APIs, Databases"
    },

    "saas-development": {
      title: "SaaS Platform Development",
      description:
        "We build complete SaaS platforms with authentication, dashboards, subscriptions, and scalable backend systems.",
      offers: [
        "User authentication & roles",
        "Subscription & billing systems",
        "Admin dashboards",
        "Cloud deployment"
      ],
      forWho: "Startups and businesses launching SaaS products.",
      tech: "React, Spring Boot, MySQL, Stripe"
    },

    "database-backend": {
      title: "Database & Backend Systems",
      description:
        "We design secure and scalable backend systems that power applications reliably.",
      offers: [
        "Database design & optimization",
        "Backend APIs",
        "Data security",
        "Performance tuning"
      ],
      forWho: "Companies needing reliable data systems and backend infrastructure.",
      tech: "MySQL, PostgreSQL, Java, REST APIs"
    },

    "it-consulting": {
      title: "IT Consulting",
      description:
        "We provide expert guidance to help businesses make the right technology decisions.",
      offers: [
        "Technology strategy",
        "System architecture planning",
        "Software audits",
        "Digital transformation guidance"
      ],
      forWho: "Businesses needing expert IT direction without hiring full-time staff.",
      tech: "Industry best practices & modern frameworks"
    },

    "mobile-apps": {
      title: "Mobile App Development",
      description:
        "We build modern mobile applications for iOS and Android with clean UI and scalable backend systems.",
      offers: [
        "Cross-platform mobile apps",
        "UI/UX design",
        "API integration",
        "App store deployment"
      ],
      forWho: "Businesses launching or upgrading mobile applications.",
      tech: "Flutter, React Native, REST APIs"
    }
  };

  const service = services[serviceSlug];

  if (!service) {
    return <h2 style={{ textAlign: "center" }}>Service not found</h2>;
  }

  return (
    <div className="services-container">
      <h1 className="services-title">{service.title}</h1>
      <p className="services-subtitle">{service.description}</p>

      <div className="service-detail-section">
        <h3>What We Offer</h3>
        <ul>
          {service.offers.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Who This Is For</h3>
        <p>{service.forWho}</p>

        <h3>Technology Stack</h3>
        <p>{service.tech}</p>
      </div>

      <div className="service-detail-actions">
        <Link to="/contact" className="service-btn">
          Request This Service
        </Link>
        <Link to="/services" className="service-back">
          ← Back to Services
        </Link>
      </div>
    </div>
  );
}

export default ServiceDetail;

