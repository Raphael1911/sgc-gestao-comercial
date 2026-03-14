import React, { useState, useRef } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  X,
  ShoppingCart,
  Barcode,
  Banknote,
  CreditCard,
  Smartphone,
  ChevronRight,
  Package,
} from "lucide-react";

interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface CartItem extends Product {
  qty: number;
}

const PRODUCTS: Product[] = [
  { id: "p1", code: "7891000053508", name: "Coca-Cola 2L", price: 9.99, category: "Bebidas", stock: 24 },
  { id: "p2", code: "7891000100103", name: "Coca-Cola Lata 350ml", price: 4.50, category: "Bebidas", stock: 48 },
  { id: "p3", code: "7891910000197", name: "Água Mineral 500ml", price: 2.50, category: "Bebidas", stock: 60 },
  { id: "p4", code: "7894900011517", name: "Guaraná Antarctica 2L", price: 8.90, category: "Bebidas", stock: 18 },
  { id: "p5", code: "7891149900025", name: "Suco Del Valle Laranja", price: 6.99, category: "Bebidas", stock: 30 },
  { id: "p6", code: "7622210951694", name: "Biscoito Oreo Original", price: 5.99, category: "Snacks", stock: 4 },
  { id: "p7", code: "7891962022108", name: "Barra Cereal Duo Figo", price: 3.49, category: "Snacks", stock: 20 },
  { id: "p8", code: "7896004004059", name: "Chips Lays Original 100g", price: 7.90, category: "Snacks", stock: 2 },
  { id: "p9", code: "5099873013106", name: "Red Bull 250ml", price: 12.90, category: "Energéticos", stock: 1 },
  { id: "p10", code: "7896004004067", name: "Monster Energy 473ml", price: 10.90, category: "Energéticos", stock: 12 },
];

type PayMethod = "dinheiro" | "cartao" | "pix";

export default function POS() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [payMethod, setPayMethod] = useState<PayMethod>("pix");
  const [cashAmount, setCashAmount] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = search.length > 0
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.code.includes(search)
      )
    : PRODUCTS;

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setSearch("");
    searchRef.current?.focus();
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const discount = 0;
  const finalTotal = total - discount;
  const change = payMethod === "dinheiro" && cashAmount
    ? parseFloat(cashAmount.replace(",", ".")) - finalTotal
    : null;

  const finalizeSale = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCart([]);
      setSearch("");
      setCashAmount("");
      searchRef.current?.focus();
    }, 2000);
  };

  const categories = [...new Set(PRODUCTS.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const displayProducts = activeCategory === "Todos"
    ? filtered
    : filtered.filter((p) => p.category === activeCategory);

  return (
    <div className="flex h-full" style={{ background: "#F8FAFC" }}>
      {/* Left — Product selection */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-gray-100">
        {/* Search bar */}
        <div className="p-4 bg-white border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Barcode className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={searchRef}
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou código de barras..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {["Todos", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                style={{ fontWeight: 600 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {displayProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-300">
              <Package className="w-10 h-10 mb-2" />
              <p className="text-sm">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`bg-white rounded-xl p-3 border text-left transition-all group hover:shadow-md hover:border-blue-200 active:scale-95 relative ${
                    product.stock === 0
                      ? "opacity-50 cursor-not-allowed border-gray-100"
                      : "border-gray-100 cursor-pointer"
                  }`}
                >
                  {product.stock <= 3 && product.stock > 0 && (
                    <span
                      className="absolute top-2 right-2 bg-red-100 text-red-500 text-xs px-1.5 py-0.5 rounded-full"
                      style={{ fontSize: 10, fontWeight: 700 }}
                    >
                      {product.stock} un.
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                    <Package className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-gray-800 text-xs mb-1 line-clamp-2" style={{ fontWeight: 600 }}>
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">{product.category}</p>
                  <p className="text-blue-700" style={{ fontWeight: 700, fontSize: 14 }}>
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </p>
                  <div className="absolute bottom-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right — Cart & Checkout */}
      <div className="w-80 xl:w-96 flex flex-col bg-white flex-shrink-0">
        {/* Cart header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            <span className="text-gray-800" style={{ fontWeight: 700 }}>Carrinho</span>
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => setShowCancel(true)}
              className="text-xs text-red-500 hover:text-red-700 transition-colors"
              style={{ fontWeight: 500 }}
            >
              Cancelar venda
            </button>
          )}
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3">
              <ShoppingCart className="w-12 h-12" />
              <p className="text-sm">Carrinho vazio</p>
              <p className="text-xs text-gray-300">Clique nos produtos para adicionar</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-50">
              {cart.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="text-xs text-gray-300 w-4" style={{ fontWeight: 600 }}>{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 truncate" style={{ fontWeight: 600 }}>{item.name}</p>
                    <p className="text-xs text-gray-400">
                      R$ {item.price.toFixed(2).replace(".", ",")} / un.
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3 text-gray-500" />
                    </button>
                    <span className="w-6 text-center text-xs text-gray-800" style={{ fontWeight: 700 }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3 text-blue-600" />
                    </button>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-xs text-gray-800" style={{ fontWeight: 700 }}>
                      R$ {(item.price * item.qty).toFixed(2).replace(".", ",")}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout panel */}
        <div className="border-t border-gray-100 p-5 flex flex-col gap-4">
          {/* Totals */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm text-gray-400">
              <span>{cart.reduce((a, i) => a + i.qty, 0)} itens</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-emerald-500">
                <span>Desconto</span>
                <span>- R$ {discount.toFixed(2).replace(".", ",")}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-gray-800" style={{ fontWeight: 700 }}>Total</span>
              <span className="text-blue-700" style={{ fontWeight: 800, fontSize: 20 }}>
                R$ {finalTotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <p className="text-xs text-gray-400 mb-2" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Forma de Pagamento
            </p>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: "dinheiro", label: "Dinheiro", icon: Banknote },
                { key: "cartao", label: "Cartão", icon: CreditCard },
                { key: "pix", label: "PIX", icon: Smartphone },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setPayMethod(key)}
                  className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border-2 transition-all text-xs ${
                    payMethod === key
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-100 text-gray-400 hover:border-gray-200"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Cash input */}
          {payMethod === "dinheiro" && (
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block" style={{ fontWeight: 600 }}>
                Valor recebido
              </label>
              <input
                type="text"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                placeholder="R$ 0,00"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {change !== null && change >= 0 && (
                <div className="mt-2 flex justify-between text-sm px-1">
                  <span className="text-gray-400">Troco</span>
                  <span className="text-emerald-600" style={{ fontWeight: 700 }}>
                    R$ {change.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              )}
              {change !== null && change < 0 && (
                <p className="mt-2 text-xs text-red-500 px-1">Valor insuficiente</p>
              )}
            </div>
          )}

          {/* Finalize button */}
          <button
            onClick={finalizeSale}
            disabled={cart.length === 0 || (payMethod === "dinheiro" && (change === null || change < 0))}
            className="w-full py-3.5 rounded-xl text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            style={{
              background: "linear-gradient(135deg, #059669, #10B981)",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            <CheckCircle className="w-5 h-5" />
            Finalizar Venda
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 flex flex-col items-center gap-4 shadow-2xl">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: 22 }}>Venda Finalizada!</h3>
            <p className="text-gray-500 text-sm text-center">
              Total: <strong>R$ {finalTotal.toFixed(2).replace(".", ",")}</strong> — {payMethod === "dinheiro" ? "Dinheiro" : payMethod === "cartao" ? "Cartão" : "PIX"}
            </p>
            <div
              className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
            />
          </div>
        </div>
      )}

      {/* Cancel modal */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-5 mx-auto">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-gray-800 text-center mb-2" style={{ fontWeight: 700, fontSize: 18 }}>
              Cancelar Venda?
            </h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              Todos os {cart.length} itens serão removidos do carrinho. Essa ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Manter Venda
              </button>
              <button
                onClick={() => {
                  setCart([]);
                  setShowCancel(false);
                }}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
                style={{ fontWeight: 600 }}
              >
                Cancelar Venda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
