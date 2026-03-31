import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        sku: body.sku,
        price: parseFloat(body.price),
        quantity: parseInt(body.quantity),
        category: body.category || "General",
      },
    });
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "Operation Failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json([]);
  }
}