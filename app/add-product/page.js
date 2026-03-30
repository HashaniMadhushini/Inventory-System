"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">Smart Inventory</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage your products with JavaScript!</p>
          </div>
          <Link href="/add-product" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all">
            + Add New Product
          </Link>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            className="w-full p-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-5 text-sm font-bold uppercase">Product Name</th>
                <th className="p-5 text-sm font-bold uppercase">SKU</th>
                <th className="p-5 text-sm font-bold uppercase">Stock</th>
                <th className="p-5 text-sm font-bold uppercase text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-20 text-center text-slate-400 font-medium">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-indigo-50/50">
                    <td className="p-5 font-bold text-slate-800">{product.name}</td>
                    <td className="p-5 text-slate-500 font-mono text-sm">{product.sku}</td>
                    <td className="p-5 text-sm font-bold">{product.quantity} units</td>
                    <td className="p-5 font-black text-slate-900 text-right">Rs. {product.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}