
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../services/api";
let isAdmin = false;

function Products({ refreshCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

 
  const addToCart = async (product) => {
    if(!isAdmin)
    {
      try {
      await API.post("/cart/add", {
        productId: product._id,
        quantity: 1
      });
      refreshCart(); // 🔥 sync navbar
      alert("Added to cart");
    } catch (error) {
      alert("Failed to add to cart");
    }
  }
  else{
        alert("Failed to add cart please login as customer you are a admin now");
  }
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1 className="page-title">Our Products</h1>
        <p className="page-subtitle">Discover amazing products just for you</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
