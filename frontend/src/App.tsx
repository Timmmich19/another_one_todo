import { Task, type TaskProps } from "./components/task";
function App() {
  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-4xl">TODO</h1>
        <div className="flex flex-col gap-2 p-4 items-center">
          {tasks.map((task) => (
            <Task title={task.title} description={task.description} key={task.title} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

//mocks
const tasks: TaskProps[] = [
  {
    title: "Task",
    description:
      "Создать простое одностраничное приложение (SPA) для управления задачами — добавление, отображение, изменение статуса и удаление.",
    status: "in-progress",
  },
  {
    title: "Taskasdasd 2",
    description: "Использовать React для построения пользовательского интерфейса и управления состоянием приложения.",
    status: "pending",
  },
];
