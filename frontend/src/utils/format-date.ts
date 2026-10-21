// "2026-10-12" -> "12 Ekim 2026"
export function formatDate(date: string) {
  return new Date(`${date}T00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
