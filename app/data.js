export const menuItems = [
  {
    id: "nasi-ayam-panggang",
    name: "Nasi ayam panggang",
    price: 13000,
    category: "ayam",
    description: "Nasi, ayam panggang, dan sayuran.",
    image: "/assets/images/meal-grill.jpg",
    alt: "Ayam panggang dan nasi, foto makanan stand-in"
  },
  {
    id: "gado-gado-komplit",
    name: "Gado-gado komplit",
    price: 12000,
    category: "sayur",
    description: "Sayuran, tahu, dan saus kacang.",
    image: "/assets/images/meal-green.jpg",
    alt: "Sayuran dan lauk, foto makanan stand-in"
  },
  {
    id: "nasi-tempe-orek-telur",
    name: "Nasi tempe orek dan telur",
    price: 10000,
    category: "telur",
    description: "Nasi, tempe orek, dan telur.",
    image: "/assets/images/meal-bowl.jpg",
    alt: "Nasi dan lauk dalam mangkuk, foto makanan stand-in"
  },
  {
    id: "nasi-pepes-nila-kemangi",
    name: "Nasi pepes nila kemangi",
    price: 15000,
    category: "ikan",
    description: "Nasi, pepes nila, dan sayuran.",
    image: "/assets/images/meal-soup.jpg",
    alt: "Hidangan ikan dan sayuran, foto makanan stand-in"
  }
];

export const plans = [
  {
    id: "harian",
    name: "Harian",
    portions: 1,
    discountPerPortion: 0,
    description: "Pesan sesuai kebutuhan tanpa komitmen. Harga sesuai menu."
  },
  {
    id: "mingguan",
    name: "Mingguan",
    portions: 5,
    discountPerPortion: 500,
    description: "5 porsi (Senin sampai Jumat). Diskon Rp500 per porsi."
  },
  {
    id: "bulanan",
    name: "Bulanan",
    portions: 20,
    discountPerPortion: 1000,
    description: "20 porsi dalam sebulan. Diskon Rp1.000 per porsi."
  }
];

export const deliverySlots = [
  { name: "Siang 1", time: "11.15 sampai 12.00" },
  { name: "Siang 2", time: "12.15 sampai 13.00" },
  { name: "Sore", time: "17.00 sampai 17.45" }
];

export const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/langganan", label: "Paket" },
  { href: "/perbandingan", label: "Info Pemesanan" },
  { href: "/testimoni", label: "Tentang Kami" }
];
