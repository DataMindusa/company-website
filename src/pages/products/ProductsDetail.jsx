import { useParams, Link } from "react-router-dom";
import "../../styles/products.css";

function ProductDetail() {
  const { productSlug } = useParams();

  const products = {
    "fashionapp": {
      name: "FashionApp",
      description:
        "FashionApp is a complete business management platform built for tailors, designers, and fashion entrepreneurs to manage clients, measurements, orders, and payments in one place.",
      features: [
        "Client & measurement management",
        "Order tracking & status updates",
        "Payment tracking",
        "Business analytics dashboard",
        "Multi-device access"
      ],
      status: "Live",
      launchUrl: "https://.yourdomain.com"
    },

    "automation-platform": {
      name: "Business Automation Platform",
      description:
        "A powerful platform that helps businesses automate workflows, track data, and improve productivity.",
      features: [
        "Workflow automation",
        "Reporting dashboards",
        "Role-based access",
        "Cloud-ready architecture"
      ],
      status: "In Development"
    },

    "booking-system": {
      name: "Booking & Scheduling System",
      description:
        "A complete booking solution for service-based businesses with customer management and scheduling.",
      features: [
        "Online booking",
        "Customer profiles",
        "Calendar integration",
        "Admin dashboard"
      ],
      status: "In Development"
    }
  };

  const product = products[productSlug];

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  return (
    <div className="products-container">
      <h1 className="products-title">{product.name}</h1>
      <p className="products-subtitle">{product.description}</p>

      <h3>Key Features</h3>
      <ul>
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <p className="product-status">
        Status: <strong>{product.status}</strong>
      </p>

      <div className="product-actions">
        {product.launchUrl ? (
          <a
            href={product.launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="product-btn"
          >
            Launch FashionApp
          </a>
        ) : (
          <Link to="/contact" className="product-btn">
            Request Demo
          </Link>
        )}

        <Link to="/products" className="product-back">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;

