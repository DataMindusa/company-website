import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-logo">DataMind</h3>

        <p className="footer-text">
          Building modern software and automation tools for businesses in the U.S. & Africa.
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} DataMind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
