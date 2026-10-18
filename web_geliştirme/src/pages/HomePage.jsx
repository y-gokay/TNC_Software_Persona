import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskModal from "../components/TaskModal.jsx";
import { createTask } from "../interfaces/task.js";
import { loadTasks, saveTasks } from "../utils/storage.js";

const seed = [
  {
    id: 1,
    title: "Login ekranını geliştir",
    description: "JWT login ekranı hazırlanacak",
    status: "pending",
    priority: "high",
    createdAt: "2026-09-15",
  },
  {
    id: 2,
    title: "Dashboard geliştir",
    description: "Admin dashboard",
    status: "inProgress",
    priority: "medium",
    createdAt: "2026-09-16",
  },
  {
    id: 3,
    title: "API dokümantasyonu",
    description: "Endpointleri yaz",
    status: "completed",
    priority: "low",
    createdAt: "2026-09-11",
  },
];

const filters = [
  { id: "all", label: "Hepsi" },
  { id: "pending", label: "Bekleyen" },
  { id: "inProgress", label: "Devam" },
  { id: "completed", label: "Bitti" },
];

export default function HomePage() {
  const [tasks, setTasks] = useState(() => {
    const saved = loadTasks();
    return saved.length > 0 ? saved : seed;
  });
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function handleCreate(payload) {
    setTasks((prev) => [createTask(payload), ...prev]);
  }

  function handleSave(payload) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedId
          ? {
              ...task,
              title: payload.title.trim(),
              description: payload.description.trim(),
              priority: payload.priority,
              status: payload.status,
            }
          : task
      )
    );
    setSelectedId(null);
  }

  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
        };
      })
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  }

  const selectedTask = tasks.find((task) => task.id === selectedId) || null;
  const visible = filter === "all" ? tasks : tasks.filter((task) => task.status === filter);
  const openCount = tasks.filter((task) => task.status !== "completed").length;
  const doneCount = tasks.length - openCount;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 lg:h-screen lg:overflow-hidden">
      <header className="animate-fadeUp mb-6 shrink-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
          Takım işleri
        </p>
        <h1 className="font-display mt-2 text-[2.35rem] leading-none tracking-tight text-stone-900">
          TeamTask
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-500">
          Görevler tarayıcıda duruyor. Sayfa yenilense de kaybolmaz.
        </p>
        <p className="mt-4 text-xs text-stone-400">
          {openCount} açık · {doneCount} bitti
        </p>
      </header>

      <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(380px,440px)_1fr]">
        <aside className="animate-fadeUp" style={{ animationDelay: "60ms" }}>
          <TaskForm onSubmit={handleCreate} />
        </aside>

        <section className="animate-fadeUp flex min-h-0 min-w-0 flex-col" style={{ animationDelay: "110ms" }}>
          <div className="mb-3 flex shrink-0 flex-wrap gap-1.5">
            {filters.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                    active
                      ? "bg-stone-900 text-[#f3efe6] shadow-sm"
                      : "bg-white/70 text-stone-500 ring-1 ring-stone-200/80 hover:bg-white hover:text-stone-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="list-scroll min-h-0 flex-1 overflow-y-auto pr-1 max-lg:max-h-[min(65vh,560px)]">
            <TaskList
              tasks={visible}
              onToggle={handleToggle}
              onOpen={(task) => setSelectedId(task.id)}
              onDelete={handleDelete}
            />
          </div>
        </section>
      </div>

      {selectedTask ? (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedId(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ) : null}
    </main>
  );
}
