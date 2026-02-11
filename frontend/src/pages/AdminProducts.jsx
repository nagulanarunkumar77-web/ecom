import { useEffect, useState } from "react";
import API from "../services/api";
  import ProductImage from "../components/ProductImage";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  // form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // edit state
  const [editingId, setEditingId] = useState(null);

  // fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // reset form
  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setImage(null);
    setEditingId(null);
  };

  // submit add / update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !stock || !category) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("description", description);

    // image is optional (important)
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        // UPDATE
        await API.put(`/products/${editingId}`, formData);
        alert("Product updated");
      } else {
        // CREATE
        await API.post("/products", formData);
        alert("Product added");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      alert("Operation failed");
    }
  };

  // edit product
  const editProduct = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
    setDescription(product.description || "");
    setImage(null); // important: don't auto replace image
  };

  // delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2 className="page-title">Admin – Products</h2>
      </div>

      {/* ADD / EDIT FORM */}
      <div className="admin-form-section">
        <h3 className="section-title">{editingId ? "Edit Product" : "Add New Product"}</h3>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="file-input-label">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="file-input"
              />
              <span className="file-input-text">
                {image ? image.name : "Choose Image"}
              </span>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div className="admin-table-section">
        <h3 className="section-title">Product List</h3>

        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products found</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      {p.image?.url && (
                        <ProductImage
                          image={p.image}
                          name={p.name}
                          width={80}
                          height={60}
                        />
                      )}
                    </td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn btn-sm btn-edit"
                          onClick={() => editProduct(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-delete"
                          onClick={() => deleteProduct(p._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
