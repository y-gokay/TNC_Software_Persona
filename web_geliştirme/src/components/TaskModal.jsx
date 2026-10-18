import { useEffect, useState } from "react";

export default function TaskModal({ task, onClose, onSave, onDelete }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority || "medium",
    status: task.status || "pending",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority || "medium",
      status: task.status || "pending",
    });
    setError("");
  }, [task]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

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

    onSave({
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]" />

      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        className="animate-fadeUp relative w-full max-w-md space-y-3 rounded-2xl border border-white/80 bg-[#fffdf8] p-5 shadow-card"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
              Görev
            </p>
            <h2
              id="task-modal-title"
              className="mt-1 text-lg font-medium text-stone-900"
            >
              Düzenle
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-stone-400 transition hover:bg-stone-100 hover:text-stone-900"
          >
            Kapat
          </button>
        </div>

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

        <div className="grid grid-cols-2 gap-2">
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

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            aria-label="Durum"
            className="field"
          >
            <option value="pending">Bekleyen</option>
            <option value="inProgress">Devam</option>
            <option value="completed">Bitti</option>
          </select>
        </div>

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <p className="text-xs text-stone-400">{task.createdAt}</p>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-600 hover:text-white"
          >
            Sil
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-stone-900 px-3 py-2.5 text-sm font-medium text-[#f3efe6] transition hover:bg-stone-800"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
