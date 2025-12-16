import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import ServiceDetail from "./pages/services/serviceDetail";
import ProductDetail from "./pages/products/ProductsDetail";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
        <Route path="/products/:productSlug" element={<ProductDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;


