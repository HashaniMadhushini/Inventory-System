"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [formData, setFormData] = useState({ name: "", sku: "", price: "", quantity: "", category: "General" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50">
        <h1 className="text-4xl font-black text-slate-900 mb-2">New Product</h1>
        <p className="text-slate-400 mb-10 font-medium">Please enter the details for the new inventory item.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text" required placeholder="Product Display Name"
            className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text" required placeholder="Unique SKU Code"
            className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-mono font-bold placeholder-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          />
          
          <select 
            className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="General">Category: General</option>
            <option value="Electronics">Category: Electronics</option>
            <option value="Foods & Beverages">Category: Foods & Beverages</option>
            <option value="Stationery">Category: Stationery</option>
            <option value="Apparel">Category: Apparel</option>
          </select>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Price (Rs)</label>
              <input
                type="number" required placeholder="0.00"
                className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-black focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Initial Stock</label>
              <input
                type="number" required placeholder="0"
                className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-black focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6 flex flex-col gap-4">
            <button type="submit" className="w-full bg-slate-900 text-white p-6 rounded-3xl font-black text-xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest">
              Add to Inventory
            </button>
            <button type="button" onClick={() => router.push("/")} className="w-full text-slate-400 font-bold hover:text-slate-600 transition-colors py-2 text-sm uppercase tracking-widest">
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}