"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

// Make sure the function name starts with a Capital letter (EditProduct)
export default function EditProduct() {
  const [formData, setFormData] = useState({ 
    name: "", 
    sku: "", 
    price: "", 
    quantity: "", 
    category: "General" 
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch(`/api/products/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setFormData({
              name: data.name || "",
              sku: data.sku || "",
              price: data.price?.toString() || "",
              quantity: data.quantity?.toString() || "",
              category: data.category || "General",
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Loading Product Data...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-50">
        <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Update Product</h1>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 font-sans">Product Name</label>
            <input
              type="text" required value={formData.name}
              className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 font-sans">Price (Rs)</label>
              <input
                type="number" required value={formData.price}
                className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-black focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 font-sans">Stock Quantity</label>
              <input
                type="number" required value={formData.quantity}
                className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-black focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6 flex flex-col gap-4">
            <button type="submit" className="w-full bg-slate-900 text-white p-6 rounded-3xl font-black text-xl hover:bg-indigo-600 transition-all uppercase tracking-widest shadow-lg">
              Save Updates
            </button>
            <button type="button" onClick={() => router.push("/")} className="w-full text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors">
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}