import {useState} from 'react'

import type {Status, TaskType} from '../types'
import {TrashIcon} from '../assets/trash'

export interface TaskProps {
  task: TaskType
  handleDelete: () => void
  handleUpdate: (id: string, status: Status) => void
}

export const Task: React.FC<TaskProps> = ({task, handleDelete, handleUpdate}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div
      className='bg-[#2e3030] rounded py-2 px-4 w-full flex flex-row gap-4 items-center'
      onClick={() => {
        handleClick()
      }}
    >
      <Progress task={task} handleUpdate={handleUpdate}/>
      <div className='flex flex-col size-full min-w-0 justify-between'>
        <h2 className='text-nowrap text-lg' title={task.title}>
          {task.title}
        </h2>
        <p className={`text-base ${!isOpen && 'text-nowrap truncate'}`}>{task.description}</p>
      </div>
      <button
        className='ml-auto hover:bg-[#424242] rounded-2xl size-8 flex items-center justify-center cursor-pointer'
        title='delete'
        onClick={e => {
          e.stopPropagation()
          handleDelete()
        }}
      >
        <TrashIcon />
      </button>
    </div>
  )
}

interface ProgressProps {
  task: TaskType
  handleUpdate: (id: string, status: Status) => void
}

const Progress: React.FC<ProgressProps> = ({task, handleUpdate}) => {

  const buttons:{status: Status, color: string}[] = [
    {status: 'pending', color: 'bg-blue-400'},
    {status: 'in_progress', color: 'bg-amber-400'},
    {status: 'done', color: 'bg-green-400'}
  ]
  return (
    <div className='flex flex-col gap-1'>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`rounded-full size-4 ${
            button.status === task.status ? button.color : 'bg-gray-500 hover:border hover:cursor-pointer'
          }`}
          onClick={e => {
            e.stopPropagation()
            handleUpdate(task.id, button.status)
          }}
        />
      ))}
    </div>
  )
}
