"use client";

export default function AdminCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="admin-card">
        <h2>Libros</h2>
        <p>25 registrados</p>
      </div>
      <div className="admin-card">
        <h2>Usuarios</h2>
        <p>142 registrados</p>
      </div>
      <div className="admin-card">
        <h2>Pedidos</h2>
        <p>15 este mes</p>
      </div>
    </div>
  );
}
