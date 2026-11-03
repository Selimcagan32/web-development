import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      {sent && <p className="basari-kutusu">Bağlantı {email} adresine gönderildi (demo).</p>}
      <form noValidate onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          <span className="hata-metni">{error}</span>
        </p>
        <p>
          <button type="submit">Bağlantı gönder</button>
        </p>
        <p className="baglantilar">
          <Link to="/login">← Girişe dön</Link>
        </p>
      </form>
    </>
  );
}

export default ForgotPasswordPage;
