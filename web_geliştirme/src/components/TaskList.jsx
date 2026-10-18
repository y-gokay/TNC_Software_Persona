import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onOpen, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-stone-300/80 bg-white/40 px-4 py-10 text-center text-sm text-stone-500">
        Bu filtrede görev yok.
      </p>
    );
  }

  return (
    <ul className="space-y-2.5">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onOpen={onOpen}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
