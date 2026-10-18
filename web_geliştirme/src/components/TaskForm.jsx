import { useState } from "react";

const empty = {
  title: "",
  description: "",
  priority: "medium",
};

export default function TaskForm({ onSubmit }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Başlık boş olmaz.");
      return;
    }

    onSubmit({
      title: form.title,
      description: form.description,
      priority: form.priority,
    });

    setForm(empty);
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-card backdrop-blur-sm"
    >
      <h2 className="text-sm font-medium text-stone-900">Yeni görev</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Başlık"
        aria-label="Başlık"
        className="field"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Açıklama (Zorunlu değil)"
        aria-label="Açıklama"
        rows={4}
        className="field resize-none"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        aria-label="Öncelik"
        className="field"
      >
        <option value="low">Düşük</option>
        <option value="medium">Orta</option>
        <option value="high">Yüksek</option>
      </select>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <button
        type="submit"
        className="w-full rounded-xl bg-stone-900 px-3 py-2.5 text-sm font-medium text-[#f3efe6] transition hover:bg-stone-800 active:scale-[0.99]"
      >
        Ekle
      </button>
    </form>
  );
}
