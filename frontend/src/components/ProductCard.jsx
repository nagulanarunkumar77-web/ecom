import ProductImage from "./ProductImage";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <ProductImage
          image={product.image}
          name={product.name}
          width={280}
          height={250}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price"><b>₹{product.price}</b></p>
      </div>

      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
