"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CartProvider, formatRupiah, useCart } from "./cart-provider";
import { menuItems, navLinks, plans } from "../app/data";

function CartDrawer() {
  const {
    cart, cartOpen, closeCart, changeQuantity, choosePackageMenu,
    delivery, chooseDelivery, slot, chooseSlot, storageError, ready
  } = useCart();
  const closeButton = useRef(null);
  const canCalculate = cart.every((item) => item.kind !== "package" || item.productId);
  const itemCount = cart.reduce((total, item) => {
    if (item.kind === "package") {
      const plan = plans.find((entry) => entry.id === item.planId);
      return total + item.qty * (plan?.portions || 0);
    }
    return total + item.qty;
  }, 0);

  const totals = useMemo(() => cart.reduce((result, item) => {
    const product = menuItems.find((entry) => entry.id === item.productId);
    if (!product) return result;
    if (item.kind === "package") {
      const plan = plans.find((entry) => entry.id === item.planId);
      if (!plan) return result;
      const portions = item.qty * plan.portions;
      result.subtotal += portions * product.price;
      result.discount += portions * plan.discountPerPortion;
      return result;
    }
    result.subtotal += item.qty * product.price;
    return result;
  }, { subtotal: 0, discount: 0 }), [cart]);

  useEffect(() => {
    if (!cartOpen) return undefined;
    closeButton.current?.focus();
    function onKeyDown(event) {
      if (event.key === "Escape") {
        closeCart();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(document.querySelectorAll(
        ".cart-drawer button:not(:disabled), .cart-drawer select:not(:disabled)"
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("drawer-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("drawer-open");
    };
  }, [cartOpen, closeCart]);

  function simulateCheckout() {
    if (!cart.length) return "Keranjang kosong. Tambahkan menu atau paket terlebih dahulu.";
    if (!canCalculate) return "Pilih menu untuk setiap paket agar total dapat dihitung.";
    return "Simulasi selesai. Tidak ada pesanan atau pembayaran yang diproses.";
  }
  const [checkoutStatus, setCheckoutStatus] = useState("");

  return (
    <>
      {cartOpen && (
        <button className="drawer-backdrop" type="button" aria-label="Tutup keranjang" onClick={closeCart} />
      )}
      <aside
        className="cart-drawer"
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!cartOpen}
        aria-labelledby="cart-title"
        hidden={!cartOpen}
      >
        <div className="drawer-header">
          <h2 id="cart-title">Keranjang</h2>
          <button ref={closeButton} className="close-drawer-btn" type="button" aria-label="Tutup keranjang" onClick={closeCart}>
            Tutup
          </button>
        </div>
        <div className="drawer-content">
          {storageError && <p className="cart-feedback" role="alert">{storageError}</p>}
          <ul className="cart-items-list">
            {!ready && (
              <li className="cart-empty" role="status">Memuat keranjang.</li>
            )}
            {ready && !cart.length && (
              <li className="cart-empty">Keranjang masih kosong. Pilih menu atau paket untuk melihat ringkasan.</li>
            )}
            {cart.map((item) => {
              const product = menuItems.find((entry) => entry.id === item.productId);
              const plan = item.kind === "package" ? plans.find((entry) => entry.id === item.planId) : null;
              const portionCount = plan ? plan.portions * item.qty : item.qty;
              const lineTotal = product
                ? (product.price - (plan?.discountPerPortion || 0)) * portionCount
                : null;
              const menuLabelId = `cart-menu-${item.id.replaceAll(":", "-")}`;
              return (
                <li className="cart-row" key={item.id}>
                  <div>
                    <div className="cart-row-title">
                      {plan ? `Paket ${plan.name}` : product?.name || "Menu"}
                    </div>
                    {plan && (
                      <>
                        <label className="field-label" htmlFor={menuLabelId}>Menu paket {plan.name.toLowerCase()}</label>
                        <select
                          id={menuLabelId}
                          className="cart-menu-select"
                          value={item.productId || ""}
                          onChange={(event) => choosePackageMenu(item.id, event.target.value)}
                        >
                          <option value="">Pilih menu untuk menghitung total</option>
                          {menuItems.map((entry) => (
                            <option value={entry.id} key={entry.id}>{entry.name} ({formatRupiah(entry.price)})</option>
                          ))}
                        </select>
                      </>
                    )}
                    <div className="cart-row-sub">
                      {plan
                        ? `${portionCount} porsi${plan.discountPerPortion ? `, diskon ${formatRupiah(plan.discountPerPortion)} per porsi` : ""}`
                        : product ? `${formatRupiah(product.price)} per porsi` : "Harga menu tidak tersedia"}
                    </div>
                    <div className="cart-row-price">
                      {lineTotal === null ? "Pilih menu untuk menghitung harga" : formatRupiah(lineTotal)}
                    </div>
                  </div>
                  <div className="cart-qty-ctrl">
                    <button
                      className="qty-btn"
                      type="button"
                      aria-label={`Kurangi ${plan ? `paket ${plan.name}` : product?.name}`}
                      onClick={() => changeQuantity(item.id, -1)}
                    >−</button>
                    <span className="cart-qty-value" aria-label={`Jumlah ${item.qty} ${plan ? "paket" : "porsi"}`}>{item.qty}</span>
                    <button
                      className="qty-btn"
                      type="button"
                      aria-label={`Tambah ${plan ? `paket ${plan.name}` : product?.name}`}
                      onClick={() => changeQuantity(item.id, 1)}
                    >+</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <fieldset className="delivery-opts">
            <legend className="field-label">Tujuan antar</legend>
            <label className="delivery-choice">
              <input
                type="radio"
                name="delivery"
                value="meeting-point"
                checked={delivery === "meeting-point"}
                onChange={() => chooseDelivery("meeting-point")}
              />
              <span>Titik temu <strong>Gratis</strong></span>
            </label>
            <label className="delivery-choice">
              <input
                type="radio"
                name="delivery"
                value="boarding-house"
                checked={delivery === "boarding-house"}
                onChange={() => chooseDelivery("boarding-house")}
              />
              <span>Pintu kos <strong>+Rp2.000</strong></span>
            </label>
          </fieldset>
          <div className="delivery-opts">
            <label className="field-label" htmlFor="checkout-slot">Jam antar</label>
            <select id="checkout-slot" value={slot} onChange={(event) => chooseSlot(event.target.value)}>
              <option value="">Pilih jam antar</option>
              <option value="Siang 1">Siang 1 (11.15 sampai 12.00)</option>
              <option value="Siang 2">Siang 2 (12.15 sampai 13.00)</option>
              <option value="Sore">Sore (17.00 sampai 17.45)</option>
            </select>
          </div>
          <div className="cart-totals" aria-live="polite">
            <div><span>Subtotal menu</span><strong>{formatRupiah(totals.subtotal)}</strong></div>
            <div><span>Diskon paket</span><strong>−{formatRupiah(totals.discount)}</strong></div>
            <div><span>Ongkir</span><strong>{formatRupiah(delivery === "boarding-house" ? 2000 : 0)}</strong></div>
            <div className="cart-total">
              <span>Total simulasi</span>
              <strong>{canCalculate
                ? formatRupiah(totals.subtotal - totals.discount + (delivery === "boarding-house" ? 2000 : 0))
                : "Pilih menu paket"}</strong>
            </div>
          </div>
          {!canCalculate && (
            <p className="cart-feedback" role="status">Pilih menu setiap paket agar total dapat dihitung.</p>
          )}
          <p className="cart-demo-note">Keranjang ini hanya tersimpan di browser dan belum memproses pesanan.</p>
        </div>
        <div className="drawer-footer">
          <button
            className="btn btn-terra"
            type="button"
            disabled={!ready || !cart.length || !canCalculate}
            onClick={() => setCheckoutStatus(simulateCheckout())}
          >
            Cek simulasi
          </button>
          <p className="checkout-status" role="status" aria-live="polite">{checkoutStatus}</p>
        </div>
      </aside>
    </>
  );
}

function SiteContents({ children }) {
  const pathname = usePathname();
  const { cart, cartOpen, openCart } = useCart();
  const [navOpen, setNavOpen] = useState(false);
  const portionCount = cart.reduce((total, item) => {
    const plan = item.kind === "package" ? plans.find((entry) => entry.id === item.planId) : null;
    return total + item.qty * (plan?.portions || 1);
  }, 0);

  useEffect(() => {
    function closeNavOnEscape(event) {
      if (event.key === "Escape") setNavOpen(false);
    }
    document.addEventListener("keydown", closeNavOnEscape);
    return () => document.removeEventListener("keydown", closeNavOnEscape);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Lewati ke konten</a>
      <div className="demo-banner" role="note">
        Prototipe tugas mata kuliah Technopreneurship, Universitas Negeri Semarang. Belum melayani pesanan.
      </div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand-logo" href="/" prefetch={false}>
          <Image
            src="/assets/images/logo-temanporsi.png"
            alt="Logo TEMANPORSI"
            width={45}
            height={45}
            priority
          />
          <span>TEMANPORSI</span>
        </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-controls="primary-nav"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >Menu</button>
          <nav className={`site-nav${navOpen ? " nav-open" : ""}`} id="primary-nav" aria-label="Navigasi utama">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={() => setNavOpen(false)}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-actions">
            <button
              className="cart-toggle-btn"
              type="button"
              aria-label={`Buka keranjang, ${portionCount} porsi`}
              aria-controls="cart-drawer"
              aria-expanded={cartOpen}
              onClick={(event) => openCart(event.currentTarget)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H6" />
                <circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
              </svg>
              <span className="cart-button-text">Keranjang</span>
              <span className="cart-count" aria-live="polite">{portionCount}</span>
            </button>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <Link className="footer-brand" href="/" prefetch={false}>TEMANPORSI</Link>
          <nav className="footer-links" aria-label="Tautan halaman">
            {navLinks.slice(1).map((link) => <Link href={link.href} prefetch={false} key={link.href}>{link.label}</Link>)}
          </nav>
          <p className="footer-note">Checkout hanya simulasi. Tidak ada pesanan atau pembayaran yang diproses.</p>
          <p className="photo-credit">Foto makanan stand-in dari <a href="https://unsplash.com/license" rel="noreferrer">Unsplash</a>.</p>
        </div>
      </footer>
      <CartDrawer />
    </>
  );
}

export default function SiteFrame({ children }) {
  return (
    <CartProvider>
      <SiteContents>{children}</SiteContents>
    </CartProvider>
  );
}
