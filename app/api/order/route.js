import { NextResponse } from "next/server";

export async function POST(req) {
  const o = await req.json();
  if (!o?.nama || !o?.wa || !o?.items?.length || !o?.tgl || !o?.titik) {
    return NextResponse.json({ error: "Data pesanan belum lengkap." }, { status: 400 });
  }
  const kode = "TP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const order = { ...o, kode, status: "Menunggu konfirmasi" };

  if (process.env.SHEETS_URL) {
    try {
      await fetch(process.env.SHEETS_URL, { method: "POST", body: JSON.stringify(order) });
    } catch (e) {
      return NextResponse.json({ error: "Pesanan gagal dicatat. Coba lagi." }, { status: 502 });
    }
  }
  return NextResponse.json({ kode });
}