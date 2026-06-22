import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Col, Form, Row, Table } from "react-bootstrap";
import { createInventarioItem, getInventario, getStockBajo, updateInventarioItem } from "../api/inventoryApi";
import PageHeader from "../components/layout/PageHeader";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import StatCard from "../components/common/StatCard";
import InventoryForm from "../components/inventory/InventoryForm";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [stockBajo, setStockBajo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    setLoading(true);

    try {
      const [inventarioData, stockData] = await Promise.allSettled([getInventario(), getStockBajo()]);

      setItems(inventarioData.status === "fulfilled" && Array.isArray(inventarioData.value) ? inventarioData.value : []);
      setStockBajo(stockData.status === "fulfilled" && Array.isArray(stockData.value) ? stockData.value : []);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const text = `${item.nombre || ""} ${item.tipo || ""}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [items, search]);

  const totalValue = items.reduce((total, item) => total + Number(item.stockActual || 0), 0);

  function openCreate() {
    setSelectedItem(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setSelectedItem(item);
    setShowForm(true);
  }

  async function handleSubmit(payload) {
    setSaving(true);

    try {
      if (selectedItem) {
        await updateInventarioItem(selectedItem.id, payload);
      } else {
        await createInventarioItem(payload);
      }

      setShowForm(false);
      setSelectedItem(null);
      await loadInventory();
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loading text="Cargando inventario..." />;
  }

  return (
    <>
      <PageHeader
        title="Inventario de Insumos"
        subtitle="Control total de alimentos, medicinas y equipamiento de la caballeriza."
        actionLabel="Nuevo Insumo"
        actionIcon="bi bi-plus-lg"
        onAction={openCreate}
        secondaryLabel="Historial"
        secondaryIcon="bi bi-clock-history"
      />

      <Row className="g-3 mb-4">
        <Col md={6} xl={3}>
          <StatCard title="Total de insumos" value={items.length} icon="bi bi-box-seam" />
        </Col>
        <Col md={6} xl={3}>
          <StatCard title="Stock bajo" value={stockBajo.length} icon="bi bi-exclamation-triangle" variant="danger" />
        </Col>
        <Col md={6} xl={3}>
          <StatCard title="Unidades totales" value={totalValue} icon="bi bi-graph-up" variant="warning" />
        </Col>
        <Col md={6} xl={3}>
          <StatCard title="Último movimiento" value="Hoy" icon="bi bi-clock" variant="success" />
        </Col>
      </Row>

      {stockBajo.length > 0 && (
        <div className="stock-alert mb-4">
          <i className="bi bi-exclamation-triangle"></i>
          <div>
            <strong>Alertas de stock crítico detectadas</strong>
            <p>Hay {stockBajo.length} insumos por debajo del mínimo recomendado.</p>
          </div>
        </div>
      )}

      <div className="table-card">
        <div className="table-toolbar">
          <Form.Control value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre o categoría..." />
        </div>

        {filteredItems.length === 0 ? (
          <EmptyState
            icon="bi bi-box-seam"
            title="No hay insumos registrados"
            message="Agrega alimentos, medicinas o equipo al inventario."
            actionLabel="Nuevo insumo"
            onAction={openCreate}
          />
        ) : (
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Insumo</th>
                  <th>Tipo</th>
                  <th>Stock Actual</th>
                  <th>Stock Mínimo</th>
                  <th>Unidad</th>
                  <th>Vencimiento</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map((item) => {
                  const low = Number(item.stockActual || 0) <= Number(item.stockMinimo || 0);

                  return (
                    <tr key={item.id} className={low ? "table-danger-soft" : ""}>
                      <td>
                        <strong>{item.nombre}</strong>
                      </td>
                      <td>
                        <Badge bg="light" text="dark">
                          {item.tipo}
                        </Badge>
                      </td>
                      <td className={low ? "text-danger fw-bold" : ""}>{item.stockActual}</td>
                      <td>{item.stockMinimo}</td>
                      <td>{item.unidad}</td>
                      <td>{item.fechaVencimiento || "N/A"}</td>
                      <td className="text-end">
                        <Button variant="light" size="sm" onClick={() => openEdit(item)}>
                          <i className="bi bi-pencil"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <InventoryForm show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} item={selectedItem} loading={saving} />
    </>
  );
}