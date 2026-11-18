"use client";
import { useState } from "react";

export default function Cek() {
  const [kode, setKode] = useState("");
  const [hasil, setHasil] = useState(null);
  const [err, setErr] = useState("");

  async function cari(e) {
    e.preventDefault();
    setErr("");
    setHasil(null);
    const res = await fetch("/api/cek?kode=" + encodeURIComponent(kode));
    const d = await res.json();
    if (!res.ok || d.error) return setErr(d.error || "Pesanan tidak ditemukan.");
    setHasil(d);
  }

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: 20 }}>
      <h1>Cek status pesanan</h1>
      <form onSubmit={cari}>
        <input required placeholder="Contoh: TP-AB12CD" value={kode} onChange={(e) => setKode(e.target.value)} style={{ padding: 10, fontSize: 16, width: "100%", marginBottom: 12, border: "1px solid #bbb", borderRadius: 8 }} />
        <button style={{ padding: "10px 20px", fontSize: 16, borderRadius: 8, cursor: "pointer" }}>Cek</button>
      </form>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      {hasil && (
        <div style={{ marginTop: 20 }}>
          <p>Status: <strong>{hasil.status}</strong></p>
          {hasil.tgl && <p>Jadwal antar: {hasil.tgl} {hasil.jam}</p>}
        </div>
      )}
    </main>
  );
}