"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { menuItems, plans } from "../app/data";

const CART_KEY = "temanporsi_cart";
const SLOT_KEY = "temanporsi_slot";
const DELIVERY_KEY = "temanporsi_delivery";
const CartContext = createContext(null);
const menuById = new Map(menuItems.map((item) => [item.id, item]));
const planById = new Map(plans.map((plan) => [plan.id, plan]));
const legacyMenuNames = new Map(menuItems.map((item) => [item.name, item.id]));
const legacyPlanNames = new Map(plans.map((plan) => [`Paket ${plan.name}`, plan.id]));

function migrateCart(saved) {
  if (!Array.isArray(saved)) {
    throw new TypeError("Format keranjang tersimpan bukan daftar item.");
  }

  return saved.map((item, index) => {
    if (!item || !Number.isInteger(item.qty) || item.qty < 1) {
      throw new TypeError("Item keranjang tersimpan tidak valid.");
    }

    if (item.kind === "menu" && menuById.has(item.productId)) {
      return {
        id: `menu:${item.productId}`,
        kind: "menu",
        productId: item.productId,
        qty: item.qty
      };
    }

    if (item.kind === "package" && planById.has(item.planId)) {
      return {
        id: `package:${item.planId}:${item.productId || "unselected"}`,
        kind: "package",
        planId: item.planId,
        productId: menuById.has(item.productId) ? item.productId : "",
        qty: item.qty
      };
    }

    if (typeof item.name === "string" && legacyMenuNames.has(item.name)) {
      const productId = legacyMenuNames.get(item.name);
      return { id: `menu:${productId}`, kind: "menu", productId, qty: item.qty };
    }

    if (typeof item.name === "string" && legacyPlanNames.has(item.name)) {
      const planId = legacyPlanNames.get(item.name);
      return {
        id: `package:${planId}:unselected-${index}`,
        kind: "package",
        planId,
        productId: "",
        qty: item.qty
      };
    }

    throw new TypeError("Item keranjang tersimpan tidak dikenal.");
  });
}

export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount).replace(/\u00a0/g, "");
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState("meeting-point");
  const [slot, setSlot] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [allowSave, setAllowSave] = useState(false);
  const [storageError, setStorageError] = useState("");
  const cartTrigger = useRef(null);

  useEffect(() => {
    let canSave = true;
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) setCart(migrateCart(JSON.parse(savedCart)));

      const savedSlot = localStorage.getItem(SLOT_KEY);
      if (["Siang 1", "Siang 2", "Sore"].includes(savedSlot)) setSlot(savedSlot);

      const savedDelivery = localStorage.getItem(DELIVERY_KEY);
      if (savedDelivery === "meeting-point" || savedDelivery === "boarding-house") {
        setDelivery(savedDelivery);
      }
    } catch (error) {
      canSave = false;
      setStorageError("Keranjang tersimpan tidak dapat dibaca. Tambahkan item untuk memulai ulang.");
      console.error("Keranjang lokal tidak dapat dibaca.", error);
    } finally {
      setAllowSave(canSave);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready || !allowSave) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(SLOT_KEY, slot);
      localStorage.setItem(DELIVERY_KEY, delivery);
      setStorageError("");
    } catch (error) {
      setStorageError("Penyimpanan browser gagal. Perubahan hanya tersedia sementara.");
      console.error("Perubahan keranjang tidak dapat disimpan.", error);
    }
  }, [cart, delivery, slot, ready, allowSave]);

  const updateCart = useCallback((nextCart) => {
    setAllowSave(true);
    setCart(nextCart);
  }, []);

  const openCart = useCallback((trigger) => {
    if (trigger) cartTrigger.current = trigger;
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
    requestAnimationFrame(() => cartTrigger.current?.focus());
  }, []);

  const addMenu = useCallback((productId) => {
    if (!menuById.has(productId)) return;
    const id = `menu:${productId}`;
    const existing = cart.find((item) => item.id === id);
    updateCart(existing
      ? cart.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
      : [...cart, { id, kind: "menu", productId, qty: 1 }]);
    openCart(document.activeElement);
  }, [cart, openCart, updateCart]);

  const addPackage = useCallback((planId, productId) => {
    if (!planById.has(planId) || !menuById.has(productId)) return;
    const id = `package:${planId}:${productId}`;
    const existing = cart.find((item) => item.id === id);
    updateCart(existing
      ? cart.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
      : [...cart, { id, kind: "package", planId, productId, qty: 1 }]);
    openCart(document.activeElement);
  }, [cart, openCart, updateCart]);

  const changeQuantity = useCallback((id, delta) => {
    if (!Number.isInteger(delta) || !cart.some((item) => item.id === id)) return;
    updateCart(cart
      .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
      .filter((item) => item.qty > 0));
  }, [cart, updateCart]);

  const choosePackageMenu = useCallback((id, productId) => {
    if (!menuById.has(productId)) return;
    const chosen = cart.find((item) => item.id === id && item.kind === "package");
    if (!chosen) return;
    const nextId = `package:${chosen.planId}:${productId}`;
    const duplicate = cart.find((item) => item.id === nextId);
    updateCart(cart
      .filter((item) => item.id !== id)
      .map((item) => item.id === nextId
        ? { ...item, qty: item.qty + chosen.qty }
        : item)
      .concat(duplicate ? [] : [{ ...chosen, id: nextId, productId }]));
  }, [cart, updateCart]);

  const chooseDelivery = useCallback((value) => {
    if (value !== "meeting-point" && value !== "boarding-house") return;
    setAllowSave(true);
    setDelivery(value);
  }, []);

  const chooseSlot = useCallback((value) => {
    if (value !== "" && !["Siang 1", "Siang 2", "Sore"].includes(value)) return;
    setAllowSave(true);
    setSlot(value);
  }, []);

  const value = useMemo(() => ({
    cart,
    cartOpen,
    closeCart,
    openCart,
    addMenu,
    addPackage,
    changeQuantity,
    choosePackageMenu,
    delivery,
    chooseDelivery,
    slot,
    chooseSlot,
    storageError,
    ready
  }), [
    cart, cartOpen, closeCart, openCart, addMenu, addPackage,
    changeQuantity, choosePackageMenu, delivery, chooseDelivery,
    slot, chooseSlot, storageError, ready
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart harus digunakan di dalam CartProvider.");
  return context;
}

export function AddMenuButton({ productId }) {
  const { addMenu, ready } = useCart();
  return (
    <button className="btn btn-secondary" type="button" disabled={!ready} onClick={() => addMenu(productId)}>
      Tambah ke keranjang
    </button>
  );
}

export function MenuList() {
  const [filter, setFilter] = useState("all");
  const filters = [
    ["all", "Semua"],
    ["ayam", "Ayam"],
    ["sayur", "Sayur"],
    ["telur", "Telur"],
    ["ikan", "Ikan"]
  ];
  const visibleItems = menuItems.filter((item) => filter === "all" || item.category === filter);

  return (
    <>
      <div className="menu-filter-bar">
        <div className="filter-tabs" role="group" aria-label="Saring menu berdasarkan jenis">
          {filters.map(([value, label]) => (
            <button
              className="filter-tab"
              type="button"
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="menu-results" role="status" aria-live="polite">
          {visibleItems.length ? `${visibleItems.length} menu ditampilkan.` : "Belum ada menu untuk pilihan ini."}
        </p>
      </div>
      <div className="menu-list">
        {visibleItems.map((item, index) => (
          <article className="menu-item-card" key={item.id}>
            <img
              src={item.image}
              alt={item.alt}
              width="1400"
              height="1000"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            <div className="item-main-info">
              <h2 className="item-title">{item.name}</h2>
              <p className="item-desc">{item.description}</p>
              <span className="item-price">{formatRupiah(item.price)}</span>
            </div>
            <div className="item-actions"><AddMenuButton productId={item.id} /></div>
          </article>
        ))}
      </div>
    </>
  );
}

export function PackageChooser() {
  const { addPackage, ready } = useCart();
  const [selections, setSelections] = useState({});
  const [feedback, setFeedback] = useState("");

  function chooseMenu(planId, productId) {
    setSelections((current) => ({ ...current, [planId]: productId }));
    setFeedback("");
  }

  function submitPackage(plan) {
    const productId = selections[plan.id];
    if (!productId) {
      setFeedback(`Pilih menu untuk paket ${plan.name} terlebih dahulu.`);
      return;
    }
    addPackage(plan.id, productId);
    setFeedback(`Paket ${plan.name} ditambahkan ke keranjang simulasi.`);
  }

  return (
    <section className="page-section" aria-label="Pilihan paket">
      <ul className="plan-list">
        {plans.map((plan) => {
          const labelId = `plan-menu-${plan.id}`;
          return (
            <li className="plan-row" key={plan.id}>
              <div>
                <h2>{plan.name}</h2>
                <p>{plan.description}</p>
              </div>
              <div className="package-menu">
                <label className="field-label" htmlFor={labelId}>Menu paket {plan.name.toLowerCase()}</label>
                <select
                  id={labelId}
                  value={selections[plan.id] || ""}
                  onChange={(event) => chooseMenu(plan.id, event.target.value)}
                >
                  <option value="">Pilih menu</option>
                  {menuItems.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name} ({formatRupiah(item.price)})
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-secondary"
                  type="button"
                  disabled={!ready || !selections[plan.id]}
                  onClick={() => submitPackage(plan)}
                >
                  Tambahkan paket {plan.name.toLowerCase()}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="plan-feedback" role="status" aria-live="polite">{feedback}</p>
    </section>
  );
}

export function ScheduleArea() {
  const [campus, setCampus] = useState("Sekaran dan sekitar kampus UNNES");

  return (
    <div>
      <div className="campus-field">
        <label className="field-label" htmlFor="campus-select">Area antar</label>
        <select id="campus-select" value={campus} onChange={(event) => setCampus(event.target.value)}>
          <option value="Sekaran dan sekitar kampus UNNES">Sekaran dan sekitar kampus UNNES</option>
          <option value="Patemon dan sekitarnya">Patemon dan sekitarnya</option>
        </select>
        <p className="campus-eta" role="status" aria-live="polite">
          {campus}. Titik temu diinfokan setelah pesanan dikonfirmasi.
        </p>
      </div>
      <p className="page-end">Jam antar bisa berubah mengikuti kesiapan dapur dan jumlah pesanan.</p>
    </div>
  );
}

export function SchedulePanel() {
  const { slot, chooseSlot } = useCart();

  return (
    <>
      <div className="spread-page schedule-panel">
        <fieldset className="slot-list">
          <legend>Jam antar</legend>
          <p>Pilih jam antar untuk pesananmu.</p>
          {[
            ["Siang 1", "11.15 sampai 12.00"],
            ["Siang 2", "12.15 sampai 13.00"],
            ["Sore", "17.00 sampai 17.45"]
          ].map(([name, time]) => (
            <button
              className="slot-item"
              type="button"
              key={name}
              aria-pressed={slot === name}
              onClick={() => chooseSlot(name)}
            >
              <span><span className="slot-name">{name}</span><span className="slot-detail">{time}</span></span>
              <span className="slot-state">{slot === name ? "Dipilih" : "Pilih"}</span>
            </button>
          ))}
        </fieldset>
        <p className="campus-eta" role="status" aria-live="polite">
          {slot ? `Jam antar ${slot} dipilih untuk simulasi.` : ""}
        </p>
      </div>
    </>
  );
}
