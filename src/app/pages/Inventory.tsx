import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Package,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Filter,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { buscarItens, criarItem, atualizarItem, deletarItem } from "../../services/api";

interface Product {
  _id?: string;
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  unit: string;
}

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  code: "",
  name: "",
  category: "Bebidas",
  price: 0,
  cost: 0,
  stock: 0,
  minStock: 10,
  unit: "un",
};

function getStockStatus(stock: number, minStock: number) {
  if (stock === 0) return { label: "Sem Estoque", color: "#EF4444", bg: "#FEF2F2" };
  if (stock <= minStock) return { label: "Estoque Baixo", color: "#F59E0B", bg: "#FFFBEB" };
  return { label: "Normal", color: "#10B981", bg: "#ECFDF5" };
}

const CATEGORIES = ["Bebidas", "Snacks", "Energéticos", "Farmácia", "Higiene", "Outros"];

export default function Inventory() {
  const { user } = useApp();
  const isGestor = user?.role === "gestor";

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>(EMPTY_PRODUCT);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const dados = await buscarItens();
      const itensFormatados = dados.map((item: any) => ({
        ...item,
        id: item._id 
      }));
      setProducts(itensFormatados);
    } catch (error) {
      console.error("Falha ao carregar produtos:", error);
    }
  };

  const openCreate = () => {
    setEditProduct(null);
    setFormData(EMPTY_PRODUCT);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setFormData({ ...p });
    setShowModal(true);
  };

 const saveProduct = async () => {
    try {
      if (editProduct && editProduct.id) {
        await atualizarItem(editProduct.id, formData);
      } else {
        await criarItem(formData);
      }
      await carregarProdutos(); 
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto. Verifique o console.");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deletarItem(id);
      await carregarProdutos(); // Recarrega após excluir
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = products
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.includes(search);
      const matchCat = filterCat === "Todos" || p.category === filterCat;
      const status = getStockStatus(p.stock, p.minStock);
      const matchStatus =
        filterStatus === "Todos" ||
        (filterStatus === "baixo" && status.label !== "Normal") ||
        (filterStatus === "normal" && status.label === "Normal");
      return matchSearch && matchCat && matchStatus;
    })
    .sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      const dir = sortDir === "asc" ? 1 : -1;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });

  const lowCount = products.filter((p) => p.stock <= p.minStock).length;

  const SortIcon = ({ field }: { field: keyof Product }) => {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 text-gray-300" />;
    return sortDir === "asc"
      ? <ChevronUp className="w-3 h-3 text-blue-500" />
      : <ChevronDown className="w-3 h-3 text-blue-500" />;
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900" style={{ fontWeight: 700, fontSize: 22 }}>
            Gestão de Estoque
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} produtos cadastrados</p>
        </div>
        {isGestor && (
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total de SKUs", value: products.length, color: "#1E3A5F", icon: Package },
          { label: "Alertas de Estoque", value: lowCount, color: "#EF4444", icon: AlertTriangle },
          { label: "Valor em Estoque", value: `R$ ${products.reduce((a, p) => a + p.cost * p.stock, 0).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`, color: "#10B981", icon: Package },
          { label: "Categorias", value: new Set(products.map((p) => p.category)).size, color: "#8B5CF6", icon: Filter },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.color + "18" }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-gray-400" style={{ fontSize: 11, fontWeight: 600 }}>{s.label}</p>
                <p className="text-gray-900" style={{ fontWeight: 700, fontSize: 18 }}>{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-50">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou código..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ fontWeight: 500 }}
          >
            <option value="Todos">Todas categorias</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ fontWeight: 500 }}
          >
            <option value="Todos">Todos os níveis</option>
            <option value="baixo">⚠️ Estoque Baixo</option>
            <option value="normal">✅ Normal</option>
          </select>
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} resultado(s)</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {[
                  { key: "code", label: "Código" },
                  { key: "name", label: "Produto" },
                  { key: "category", label: "Categoria" },
                  { key: "price", label: "Preço Venda" },
                  { key: "cost", label: "Custo" },
                  { key: "stock", label: "Estoque" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key as keyof Product)}
                    className="text-left px-5 py-3 text-xs text-gray-400 cursor-pointer hover:text-gray-600 select-none"
                    style={{ fontWeight: 600 }}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      <SortIcon field={col.key as keyof Product} />
                    </div>
                  </th>
                ))}
                <th className="text-left px-5 py-3 text-xs text-gray-400" style={{ fontWeight: 600 }}>Status</th>
                {isGestor && (
                  <th className="text-right px-5 py-3 text-xs text-gray-400" style={{ fontWeight: 600 }}>Ações</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const status = getStockStatus(product.stock, product.minStock);
                return (
                  <tr
                    key={product.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-xs text-gray-400" style={{ fontFamily: "monospace" }}>
                      {product.code.slice(-8)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>{product.name}</p>
                          <p className="text-xs text-gray-400">{product.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs bg-blue-50 text-blue-600" style={{ fontWeight: 600 }}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-800" style={{ fontWeight: 600 }}>
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">
                      R$ {product.cost.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-800" style={{ fontWeight: 600 }}>{product.stock}</span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min((product.stock / (product.minStock * 3)) * 100, 100)}%`,
                              background: status.color,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                        style={{
                          background: status.bg,
                          color: status.color,
                          fontWeight: 600,
                        }}
                      >
                        {status.label === "Estoque Baixo" && <AlertTriangle className="w-3 h-3" />}
                        {status.label}
                      </span>
                    </td>
                    {isGestor && (
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(product)}
                            className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
              <Package className="w-10 h-10 mb-3" />
              <p className="text-sm">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal — Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: 18 }}>
                {editProduct ? "Editar Produto" : "Novo Produto"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Nome do Produto *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Coca-Cola 2L"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Código de Barras</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="EAN-13"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Preço de Venda (R$)</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Custo (R$)</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Qtd. em Estoque</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Estoque Mínimo</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {formData.price > 0 && formData.cost > 0 && (
                <div className="bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100">
                  <p className="text-emerald-700 text-xs" style={{ fontWeight: 600 }}>
                    Margem de lucro: {(((formData.price - formData.cost) / formData.price) * 100).toFixed(1)}%
                    &nbsp;(+R$ {(formData.price - formData.cost).toFixed(2).replace(".", ",")} por unidade)
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Cancelar
              </button>
              <button
                onClick={saveProduct}
                disabled={!formData.name}
                className="flex-1 py-3 rounded-xl text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
              >
                <Check className="w-4 h-4" />
                {editProduct ? "Salvar Alterações" : "Cadastrar Produto"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-gray-800 text-center mb-2" style={{ fontWeight: 700, fontSize: 18 }}>
              Excluir Produto?
            </h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              Esta ação é permanente e não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50"
                style={{ fontWeight: 600 }}
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteProduct(deleteConfirm)}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
