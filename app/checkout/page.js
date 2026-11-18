"use client";
import { useState } from "react";
import { useCart, formatRupiah } from "../../components/cart-provider";
import { menuItems, plans } from "../data";
import { AREA, SLOT, ONGKIR } from "../../lib/shipping";

const menuById = new Map(menuItems.map((i) => [i.id, i]));
const planById = new Map(plans.map((p) => [p.id, p]));

function hitung(cart) {
  const baris = [];
  let subtotal = 0;
  let diskon = 0;
  let lengkap = true;
  for (const it of cart) {
    const m = menuById.get(it.productId);
    const p = it.kind === "package" ? planById.get(it.planId) : null;
    if (!m) { lengkap = false; continue; }
    const porsi = p ? it.qty * p.portions : it.qty;
    const potongan = p ? p.discountPerPortion || 0 : 0;
    subtotal += porsi * m.price;
    diskon += porsi * potongan;
    baris.push({
      nama: p ? "Paket " + p.name + " - " + m.name : m.name,
      porsi, harga: m.price, potongan,
    });
  }
  return { baris, subtotal, diskon, lengkap };
}

function hariIni() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

const kotak = { display: "block", width: "100%", padding: 10, margin: "4px 0 14px", border: "1px solid #bbb", borderRadius: 8, fontSize: 16 };
const wrap = { maxWidth: 560, margin: "0 auto", padding: 20 };

export default function Checkout() {
  const { cart, ready, slot, chooseSlot, delivery, chooseDelivery, clearCart } = useCart();
  const [f, setF] = useState({ nama: "", wa: "", tgl: "", area: AREA[0], titik: "", catatan: "" });
  const [kode, setKode] = useState(null);
  const [ringkas, setRingkas] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { baris, subtotal, diskon, lengkap } = hitung(cart);
  const kos = delivery === "boarding-house";
  const ongkir = ONGKIR[delivery] ?? 0;
  const total = subtotal - diskon + ongkir;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function kirim(e) {
    e.preventDefault();
    setErr("");
    if (!lengkap) return setErr("Ada paket yang menunya belum dipilih. Pilih dulu di keranjang.");
    if (!slot) return setErr("Pilih jam antar dulu.");
    setLoading(true);
    try {
      const data = {
        nama: f.nama, wa: f.wa, tgl: f.tgl,
        jam: slot + " (" + SLOT[slot] + ")",
        area: f.area,
        metode: kos ? "Antar ke pintu kos" : "Titik temu",
        titik: f.titik || "Titik temu (diinfokan admin)",
        catatan: f.catatan,
        items: baris, subtotal, diskon, ongkir, total,
      };
      const res = await fetch("/api/order", { method: "POST", body: JSON.stringify(data) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Gagal mengirim pesanan.");
      setRingkas(data);
      setKode(d.kode);
      clearCart();
    } catch (x) {
      setErr(x.message);
    }
    setLoading(false);
  }

  if (kode && ringkas) {
    const pesan = "Halo admin TemanPorsi, saya " + ringkas.nama + ". Kode pesanan " + kode + ", total " + formatRupiah(ringkas.total) + ". Antar " + ringkas.tgl + " jam " + ringkas.jam + " (" + ringkas.metode + "). Mohon info pembayarannya.";
    const wa = "https://wa.me/" + process.env.NEXT_PUBLIC_ADMIN_WA + "?text=" + encodeURIComponent(pesan);
    return (
      <main style={wrap}>
        <h1>Pesanan terkirim</h1>
        <p>Kode pesananmu: <strong style={{ fontSize: 24 }}>{kode}</strong></p>
        <p>Simpan kodenya untuk cek status di halaman <a href="/cek">Cek Pesanan</a>.</p>
        <p>Langkah terakhir: kirim konfirmasi ke admin lewat WhatsApp supaya pesananmu diproses dan kamu dapat info pembayaran.</p>
        <a href={wa} target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "12px 20px", background: "#25D366", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>Konfirmasi via WhatsApp</a>
      </main>
    );
  }

  if (!ready) return <main style={wrap}><p>Memuat...</p></main>;

  if (!cart.length) {
    return (
      <main style={wrap}>
        <h1>Checkout</h1>
        <p>Keranjangmu masih kosong. <a href="/menu">Pilih menu dulu</a>.</p>
      </main>
    );
  }

  return (
    <main style={wrap}>
      <h1>Checkout</h1>
      <h2>Pesananmu</h2>
      {baris.map((b, k) => (
        <p key={k}>{b.nama} x{b.porsi} porsi: {formatRupiah((b.harga - b.potongan) * b.porsi)}</p>
      ))}
      {!lengkap && <p style={{ color: "crimson" }}>Ada paket yang menunya belum dipilih. Buka keranjang dan pilih menunya.</p>}
      <form onSubmit={kirim}>
        <label className="field-label">Nama<input style={kotak} required value={f.nama} onChange={set("nama")} /></label>
        <label className="field-label">Nomor WhatsApp<input style={kotak} required inputMode="tel" placeholder="08xxxxxxxxxx" value={f.wa} onChange={set("wa")} /></label>
        <label className="field-label">Tanggal antar<input style={kotak} required type="date" min={hariIni()} value={f.tgl} onChange={set("tgl")} /></label>
        <label className="field-label">Jam antar
          <select style={kotak} required value={slot} onChange={(e) => chooseSlot(e.target.value)}>
            <option value="">Pilih jam antar</option>
            {Object.entries(SLOT).map(([n, j]) => <option key={n} value={n}>{n} ({j.replace("-", " sampai ")})</option>)}
          </select>
        </label>
        <label className="field-label">Area antar
          <select style={kotak} value={f.area} onChange={set("area")}>
            {AREA.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
        <label className="field-label">Tujuan antar
          <select style={kotak} value={delivery} onChange={(e) => chooseDelivery(e.target.value)}>
            <option value="meeting-point">Titik temu (gratis)</option>
            <option value="boarding-house">Pintu kos (+Rp2.000)</option>
          </select>
        </label>
        <label className="field-label">{kos ? "Alamat kos lengkap" : "Catatan lokasi (opsional, titik temu diinfokan admin)"}
          <input style={kotak} required={kos} value={f.titik} onChange={set("titik")} />
        </label>
        <label className="field-label">Catatan pesanan (opsional)<input style={kotak} value={f.catatan} onChange={set("catatan")} /></label>
        <p>Subtotal: {formatRupiah(subtotal)}<br />Diskon paket: -{formatRupiah(diskon)}<br />Ongkir: {formatRupiah(ongkir)}</p>
        <h3>Total: {formatRupiah(total)}</h3>
        {err && <p style={{ color: "crimson" }}>{err}</p>}
        <button className="btn btn-secondary" disabled={loading} type="submit">{loading ? "Mengirim..." : "Kirim pesanan"}</button>
      </form>
    </main>
  );
}