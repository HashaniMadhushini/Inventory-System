import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, sku, price, quantity, category } = body;

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
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}