import {Task} from './components/task'
import {Modal} from './components/modal'
import type {Status} from './types'
import {useTasks} from './utils/useTasks'
import {useState} from 'react'

function App() {
  const {tasks, loading, error, createTask, updateTask, deleteTask, loadTasks} = useTasks()
  const [filter, setFilter] = useState<Status | '--'>('--')

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
      <div className='p-4 h-full flex flex-col'>
        <h1 className='text-center text-4xl'>TODO</h1>
        <div className='mb-6'>
          <label className='mr-2'>Фильтр по статусу:</label>
          <select
            value={filter}
            onChange={e => {
              const newFilter = e.target.value as Status | '--'
              setFilter(newFilter)
              if (newFilter !== '--') {
                loadTasks(newFilter)
              } else {
                loadTasks()
              }
            }}
            className='border rounded px-3 py-1 bg-[#212121]'
          >
            <option value='--'>Все</option>
            <option value='pending'>Ожидают</option>
            <option value='in_progress'>В работе</option>
            <option value='done'>Завершены</option>
          </select>
          <div className='flex flex-row gap-2 items-center'>
            <div className='rounded-full size-4 bg-blue-400' />
            Ожидают выполнения
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <div className='rounded-full size-4 bg-amber-400' />
            Выполняются
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <div className='rounded-full size-4 bg-green-400' />
            Готовы
          </div>
        </div>

        <div className='flex flex-col gap-2 p-4 items-center overflow-y-auto'>
          {tasks.map(task => (
            <Task
              task={task}
              key={task.id}
              handleDelete={() => {
                handleDeleteTask(task.id)
              }}
              handleUpdate={handleStatusChange}
            />
          ))}
        </div>
        <Modal handleCreate={handleCreateTask} />
      </div>
    </>
  )
}

export default App
