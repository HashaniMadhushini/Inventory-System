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
    if (confirm("Are you sure you want to delete this item?")) {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              SMART INVENTORY
            </h1>
            <p className="text-slate-500 font-medium tracking-wide uppercase text-[10px] mt-1">
              Real-time Stock Management System
            </p>
          </div>
          
          <button
            onClick={() => router.push("/add-product")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2 group"
          >
            <span className="text-2xl group-hover:rotate-90 transition-transform">+</span> 
            NEW PRODUCT
          </button>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#1e293b] p-6 rounded-[2rem] border border-slate-800 shadow-xl">
            <p className="text-slate-500 text-[10px] font-black uppercase">Total Items</p>
            <p className="text-3xl font-black text-white mt-1">{products.length}</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-[2rem] border border-slate-800 shadow-xl border-l-4 border-l-rose-500">
            <p className="text-slate-500 text-[10px] font-black uppercase text-rose-400">Low Stock Alert</p>
            <p className="text-3xl font-black text-white mt-1">{products.filter(p => p.quantity < 5).length}</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-[2rem] border border-slate-800 shadow-xl border-l-4 border-l-cyan-500">
            <p className="text-slate-500 text-[10px] font-black uppercase text-cyan-400">Inventory Value</p>
            <p className="text-3xl font-black text-white mt-1">
              Rs. {products.reduce((acc, p) => acc + (p.price * p.quantity), 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search Bar - Modern Dark Version */}
        <div className="relative mb-8 group">
          <input
            type="text"
            placeholder="Quick search by name, category or SKU..."
            className="w-full p-6 pl-16 bg-[#1e293b] border border-slate-800 rounded-3xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-2xl placeholder:text-slate-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-7 top-1/2 -translate-y-1/2 text-2xl opacity-40 group-focus-within:opacity-100 transition-opacity">🔍</span>
        </div>

        {/* Inventory Table Container */}
        <div className="bg-[#1e293b] rounded-[2.5rem] shadow-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800">
                  <th className="p-7 text-[10px] font-black text-slate-500 uppercase tracking-widest">Product Details</th>
                  <th className="p-7 text-[10px] font-black text-slate-500 uppercase tracking-widest">SKU Code</th>
                  <th className="p-7 text-[10px] font-black text-slate-500 uppercase tracking-widest">Unit Price</th>
                  <th className="p-7 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Stock</th>
                  <th className="p-7 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-indigo-500/5 transition-colors group">
                    <td className="p-7">
                      <div className="font-bold text-slate-200 text-lg group-hover:text-white transition-colors">{p.name}</div>
                      <div className="text-[9px] text-indigo-400 font-black uppercase tracking-tighter bg-indigo-500/10 px-2 py-0.5 rounded w-fit mt-1 italic">
                        {p.category || 'General'}
                      </div>
                    </td>
                    <td className="p-7 text-slate-500 font-mono text-sm tracking-tighter">{p.sku}</td>
                    <td className="p-7 font-black text-slate-200">Rs. {p.price.toLocaleString()}</td>
                    <td className="p-7 text-center">
                      <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        p.quantity < 5 ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}>
                        {p.quantity} {p.quantity < 5 ? 'Low Stock' : 'Available'}
                      </div>
                    </td>
                    <td className="p-7 text-right">
                      <button 
                        onClick={() => router.push(`/edit-product/${p.id}`)}
                        className="text-slate-400 hover:text-indigo-400 font-black text-[10px] uppercase tracking-widest mr-6 transition-all"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteProduct(p.id)} 
                        className="text-slate-600 hover:text-rose-500 font-black text-[10px] uppercase tracking-widest transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="p-32 text-center">
              <div className="text-5xl mb-4 opacity-20">📁</div>
              <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">No records matching your search</p>
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="mt-10 text-center text-slate-700 text-[10px] font-bold uppercase tracking-[0.3em]">
          Designed for Hashini's Inventory Control
        </div>
      </div>
    </div>
  );
}