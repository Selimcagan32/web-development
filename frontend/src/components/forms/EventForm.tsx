import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  return (
    <form id="etkinlik-formu" noValidate onSubmit={handleSubmit}>
      <p>
        <label htmlFor="ad">Etkinlik Adı</label>
        <input
          type="text"
          id="ad"
          name="title"
          required
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        <span className="hata-metni">{errors.title}</span>
      </p>
      <p>
        <label htmlFor="kategori">Kategori</label>
        <select
          id="kategori"
          name="category"
          required
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="hata-metni">{errors.category}</span>
      </p>
      <p>
        <label htmlFor="tarih">Tarih</label>
        <input
          type="date"
          id="tarih"
          name="date"
          required
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        <span className="hata-metni">{errors.date}</span>
      </p>
      <p>
        <label htmlFor="saat">Saat</label>
        <input
          type="time"
          id="saat"
          name="time"
          required
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        <span className="hata-metni">{errors.time}</span>
      </p>
      <p>
        <label htmlFor="yer">Yer</label>
        <input
          type="text"
          id="yer"
          name="location"
          required
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        <span className="hata-metni">{errors.location}</span>
      </p>
      <p>
        <label htmlFor="kontenjan">Kontenjan</label>
        <input
          type="number"
          id="kontenjan"
          name="capacity"
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        <span className="hata-metni">{errors.capacity}</span>
      </p>
      <p>
        <label htmlFor="aciklama">Açıklama</label>
        <textarea
          id="aciklama"
          name="description"
          rows={4}
          cols={30}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        ></textarea>
        <span className="hata-metni">{errors.description}</span>
      </p>
      <p>
        <button type="submit">{submitText}</button>
      </p>
    </form>
  );
}

export default EventForm;
