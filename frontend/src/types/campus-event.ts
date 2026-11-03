export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

// Formdaki veri: CampusEvent gibi ama id yok; input hep metin verir
export interface EventFormData {
  title: string;
  category: Category | "";
  capacity: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

// Her alana en fazla bir hata mesajı
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
