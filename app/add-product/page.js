"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Function එක
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts(); // Table එක refresh කරනවා
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-indigo-600">Inventory Dashboard</h1>
            <p className="text-slate-500 font-medium italic">Handcrafted by Hashini 👩‍💻</p>
          </div>
          <Link href="/add-product" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all">
            + Add New Product
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search by name or SKU..."
          className="w-full p-4 mb-8 rounded-2xl border-none shadow-md focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-5 text-xs font-bold uppercase">Product Name</th>
                <th className="p-5 text-xs font-bold uppercase">SKU</th>
                <th className="p-5 text-xs font-bold uppercase">Stock</th>
                <th className="p-5 text-xs font-bold uppercase">Price</th>
                <th className="p-5 text-xs font-bold uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-bold text-slate-800">{product.name}</td>
                  <td className="p-5 text-slate-500 font-mono text-sm">{product.sku}</td>
                  <td className="p-5 font-semibold text-indigo-600">{product.quantity} units</td>
                  <td className="p-5 font-black text-slate-900">Rs. {product.price}</td>
                  <td className="p-5 text-center">
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="bg-rose-100 text-rose-600 px-4 py-2 rounded-lg font-bold hover:bg-rose-600 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}