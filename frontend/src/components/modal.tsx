import {useState, type FormEvent} from 'react'

interface Modal {
  handleCreate: (title: string, description?: string) => void
}

export const Modal: React.FC<Modal> = ({handleCreate}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault() // Отменяем стандартное поведение формы (перезагрузка страницы)
    handleCreate(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <form
      onSubmit={onSubmit}
      className='mt-auto bg-[#2e3030] p-6 rounded-lg w-full flex flex-col gap-4 mb-2 items-center'
    >
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        type='text'
        placeholder='Название'
        className='w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder='Описание'
        className='w-full resize-none p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
        type='submit'
        className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors max-w-md'
      >
        Добавить
      </button>
    </form>
  )
}
