import { NextResponse } from "next/server";

export async function GET(req) {
  const kode = new URL(req.url).searchParams.get("kode")?.trim().toUpperCase();
  if (!kode) return NextResponse.json({ error: "Kode pesanan wajib diisi." }, { status: 400 });
  if (!process.env.SHEETS_URL) {
    return NextResponse.json({ error: "Pelacakan status belum aktif. Hubungi admin lewat WhatsApp." }, { status: 503 });
  }
  try {
    const r = await fetch(`${process.env.SHEETS_URL}?kode=${encodeURIComponent(kode)}`);
    return NextResponse.json(await r.json());
  } catch (e) {
    return NextResponse.json({ error: "Gagal mengambil status. Coba lagi." }, { status: 502 });
  }
}