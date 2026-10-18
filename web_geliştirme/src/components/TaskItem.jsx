const priorityClass = {
  high: "bg-rose-50 text-rose-700",
  medium: "bg-amber-50 text-amber-800",
  low: "bg-stone-100 text-stone-600",
};

const priorityLabel = {
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
};

const statusLabel = {
  pending: "Bekleyen",
  inProgress: "Devam",
  completed: "Bitti",
};

export default function TaskItem({ task, onToggle, onOpen, onDelete, index = 0 }) {
  const done = task.status === "completed";

  function open() {
    onOpen(task);
  }

  function onKey(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  }

  return (
    <li
      className="animate-fadeUp flex items-start gap-3 rounded-2xl border border-white/80 bg-white/80 p-3.5 shadow-card backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={done ? "Bekleyene al" : "Tamamlandı işaretle"}
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          done
            ? "border-stone-900 bg-stone-900 text-[#f3efe6]"
            : "border-stone-300 bg-white hover:border-stone-900"
        }`}
      >
        {done ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
            <path
              d="M2.5 6.2 5 8.5 9.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </button>

      <div
        className="min-w-0 flex-1 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={open}
        onKeyDown={onKey}
      >
        <p
          className={`text-sm font-medium transition ${
            done ? "text-stone-400 line-through" : "text-stone-900"
          }`}
        >
          {task.title}
        </p>
        {task.description ? (
          <p className={`mt-1 text-sm leading-relaxed ${done ? "text-stone-300" : "text-stone-500"}`}>
            {task.description}
          </p>
        ) : null}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span
            className={`rounded-full px-2 py-0.5 ${
              priorityClass[task.priority] || priorityClass.medium
            }`}
          >
            {priorityLabel[task.priority] || priorityLabel.medium}
          </span>
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-500">
            {statusLabel[task.status] || task.status}
          </span>
          <span className="text-stone-400">{task.createdAt}</span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-1.5">
        <button
          type="button"
          onClick={open}
          className="rounded-lg bg-stone-900 px-2.5 py-1.5 text-xs font-medium text-[#f3efe6] transition hover:bg-stone-700"
        >
          Düzenle
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-600 hover:text-white"
        >
          Sil
        </button>
      </div>
    </li>
  );
}
