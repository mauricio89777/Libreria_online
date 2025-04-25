import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-blue-900 text-white p-4">
        <h1 className="text-xl font-semibold">Panel de Administración</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
