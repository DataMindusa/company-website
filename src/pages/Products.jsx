import { Link } from "react-router-dom";
import "../styles/products.css";

function Products() {
  return (
    <div className="products-container">
      <h1 className="products-title">Our Products</h1>
      <p className="products-subtitle">
        Software products designed to help businesses operate smarter and scale faster.
      </p>

      <div className="products-grid">

        {/* FashionApp */}
        <div className="product-card featured-product">
          <h2>FashionApp</h2>
          <p>
            A modern fashion business management platform built for tailors,
            designers, and fashion entrepreneurs to manage clients, orders,
            measurements, and payments in one place.
          </p>
          <Link to="/products/fashionapp" className="product-btn">
            View Product
          </Link>
        </div>

        {/* Future Product Placeholder */}
        <div className="product-card">
          <h2>Business Automation Platform</h2>
          <p>
            A system that automates workflows, reporting, and daily operations
            for small and growing businesses.
          </p>
          <span className="product-coming">Coming Soon</span>
        </div>

      </div>
    </div>
  );
}

export default Products;

