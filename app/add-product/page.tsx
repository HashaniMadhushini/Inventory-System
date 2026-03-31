import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Smart Inventory</h1>
            <p className="text-slate-500">Manage your products efficiently</p>
          </div>
          <Link href="/add-product" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all">
            + Add New Product
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Items</p>
            <p className="text-3xl font-bold text-indigo-600">{products.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white text-sm uppercase">
              <tr>
                <th className="p-5 font-semibold">Product Name</th>
                <th className="p-5 font-semibold">SKU Code</th>
                <th className="p-5 font-semibold">In Stock</th>
                <th className="p-5 font-semibold">Unit Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-slate-400 font-medium">
                    Inventory is empty. Start by adding a product!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-indigo-50/50 transition-colors">
                    <td className="p-5 font-semibold text-slate-800">{product.name}</td>
                    <td className="p-5 text-slate-500 font-mono text-sm">{product.sku}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.quantity > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.quantity} units
                      </span>
                    </td>
                    <td className="p-5 font-bold text-slate-900">Rs. {product.price.toLocaleString()}</td>
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