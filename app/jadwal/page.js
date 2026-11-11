import { ScheduleArea, SchedulePanel } from "../../components/cart-provider";

export const metadata = {
  title: "Jadwal dan lokasi | TEMANPORSI",
  description: "Lihat pilihan area dan jam antar TEMANPORSI."
};

export default function SchedulePage() {
  return (
    <section className="book-spread schedule-spread" aria-labelledby="schedule-title">
      <div className="spread-page spread-copy">
        <div>
          <h1 id="schedule-title">Pilih waktu dan titik temu.</h1>
          <p>Pre-order ditutup H-1 pukul 20.00. Minimal 10 porsi per jadwal antar.</p>
        </div>
        <ScheduleArea />
      </div>
      <SchedulePanel />
    </section>
  );
}
