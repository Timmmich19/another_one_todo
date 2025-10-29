import { Task, type TaskProps } from "./components/task";
import { Modal } from "./components/modal";
import type {Status} from './types'
import { useTasks } from './utils/useTasks'
import { useState } from "react";

function App() {
  const {tasks, loading, error, createTask, updateTask, deleteTask, loadTasks} = useTasks()
  const [filter, setFilter] = useState<Status | 'all'>('all')

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter)

  const handleStatusChange = async (id: string, status: Status) => {
    await updateTask(id, {status})
  }

  const handleCreateTask = async (title: string, description?: string) => {
    const success = await createTask({title, description})
    if (success) {
      // Форма сама закроется если это в модалке
    }
    return success
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id)
  }

  if (loading) return <div className='text-center py-8'>Загрузка...</div>
  if (error) return <div className='text-red-500 text-center py-8'>Ошибка: {error}</div>

  return (
    <>
      <div className='p-4 h-full'>
        <h1 className='text-center text-4xl'>TODO</h1>
        <div className="flex flex-col h-full justify-between gap-2">
          <div className='mb-6'>
          <label className='mr-2'>Фильтр по статусу:</label>
          <select
            value={filter}
            onChange={e => {
              const newFilter = e.target.value as Status | 'all'
              setFilter(newFilter)
              if (newFilter !== 'all') {
                loadTasks(newFilter)
              } else {
                loadTasks()
              }
            }}
            className='border rounded px-3 py-1'
          >
            <option value='all'>Все</option>
            <option value='pending'>Ожидают</option>
            <option value='in_progress'>В работе</option>
            <option value='done'>Завершены</option>
          </select>
        </div>
        <div className='flex flex-col gap-2 p-4 items-center overflow-y-auto'>
            {tasks.map(task => (
              <Task title={task.title} description={task.description} status={task.status} key={task.title} />
            ))}
          </div>
          <Modal />
        </div>
      </div>
    </>
  )
}

export default App

//mocks
// const tasks: TaskProps[] = [
//   {
//     title: 'Task',
//     description:
//       'Создать простое одностраничное приложение (SPA) для управления задачами — добавление, отображение, изменение статуса и удаление.',
//     status: 'in_progress'
//   },
//   {
//     title: 'Taskasdasd 2',
//     description:
//       'Использовать React для построения пользовательского интерфейса и управления состоянием приложения. Использовать React для построения пользовательского интерфейса и управления состоянием приложения. Использовать React для построения пользовательского интерфейса и управления состоянием приложения.',
//     status: 'pending'
//   }
// ]
