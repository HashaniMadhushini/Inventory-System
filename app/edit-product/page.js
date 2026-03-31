"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-indigo-900">Smart Inventory Management</h1>
          <button
            onClick={() => router.push("/add-product")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-all"
          >
            + Add New Product
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm mb-8 border border-gray-100">
          <input
            type="text"
            placeholder="Search products by name or SKU code..."
            className="w-full p-3 outline-none text-slate-600 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Product Name</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">SKU</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Price (Rs)</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Stock Level</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 font-bold text-slate-700">{p.name}</td>
                  <td className="p-5 text-gray-500 font-mono text-sm">{p.sku}</td>
                  <td className="p-5 font-bold text-indigo-600">Rs. {p.price}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      p.quantity < 5 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}>
                      {p.quantity} In Stock
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    {/* Step 4: Edit Button logic */}
                    <button 
                      onClick={() => router.push(`/edit-product/${p.id}`)}
                      className="text-indigo-500 hover:text-indigo-700 font-bold text-xs mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(p.id)}
                      className="text-red-400 hover:text-red-600 font-bold text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-medium">No products found in the inventory.</div>
          )}
        </div>
      </div>
    </div>
  );
}