# 🚀 Smart Inventory Management System

A professional, full-stack inventory control application developed to manage stock levels, product tracking, and business analytics in real-time. This system is built with a focus on speed, reliability, and a modern user experience.

## 🌟 Key Features
- **Interactive Dashboard:** Real-time summary of total products, low stock alerts, and total inventory valuation.
- **Dynamic CRUD Operations:** Full capability to Create, Read, Update, and Delete inventory items.
- **Intelligent Search:** Instant filtering by Product Name, SKU code, or Category.
- **Stock Monitoring:** Automated visual indicators for "Low Stock" (Quantity < 5) to prevent inventory shortages.
- **Premium Dark UI:** A sleek, high-contrast dark-themed interface built with Tailwind CSS for professional use.

## 🛠️ Technology Stack
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & Turbopack)
- **Frontend Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** SQLite (Local) / PostgreSQL (Production)
- **State Management:** React Hooks (Context-free efficient state handling)

## 📂 Project Architecture
```text
├── app/
│   ├── api/products/   # Backend API logic for Inventory
│   ├── add-product/    # Interface for adding new stock
│   ├── edit-product/   # Dynamic [id] routes for updating items
│   └── page.js         # Main Dashboard & Analytics UI
├── lib/
│   └── prisma.js       # Centralized Database Client
├── prisma/
│   └── schema.prisma   # Data Models & Relationships
└── public/             # Optimized Static Assets