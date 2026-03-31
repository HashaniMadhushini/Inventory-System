import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const { name, sku, price, quantity, category } = body;

    
    if (!name || !sku || !price || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        sku,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category: category || "General",
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("DETAILED_API_ERROR:", error); 
    
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "This SKU Code already exists!" }, { status: 400 });
    }

    return NextResponse.json({ error: "Database Error: " + error.message }, { status: 500 });
  }
}