interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form
      id="etkinlik-formu"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <p>
        <label htmlFor="ad">Etkinlik Adı</label>
        <input type="text" id="ad" name="ad" required />
        <span id="ad-hata"></span>
      </p>
      <p>
        <label htmlFor="kategori">Kategori</label>
        <select id="kategori" name="kategori" required>
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
        <span id="kategori-hata"></span>
      </p>
      <p>
        <label htmlFor="tarih">Tarih</label>
        <input type="date" id="tarih" name="tarih" required />
        <span id="tarih-hata"></span>
      </p>
      <p>
        <label htmlFor="saat">Saat</label>
        <input type="time" id="saat" name="saat" required />
        <span id="saat-hata"></span>
      </p>
      <p>
        <label htmlFor="yer">Yer</label>
        <input type="text" id="yer" name="yer" required />
        <span id="yer-hata"></span>
      </p>
      <p>
        <label htmlFor="kontenjan">Kontenjan</label>
        <input type="number" id="kontenjan" name="kontenjan" />
        <span id="kontenjan-hata"></span>
      </p>
      <p>
        <label htmlFor="aciklama">Açıklama</label>
        <textarea
          id="aciklama"
          name="aciklama"
          rows={4}
          cols={30}
        ></textarea>
      </p>
      <p>
        <button type="submit">Kaydet</button>
      </p>
    </form>
  );
}

export default EventForm;
