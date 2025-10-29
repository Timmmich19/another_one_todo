export const Modal: React.FC = () => {
  return (
    <form className="bg-[#2e3030] p-6 rounded-lg w-full mx-auto flex flex-col gap-4 mb-2 items-center">
      <input
        type="text"
        placeholder="Название"
        className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Описание"
        className="w-full resize-none p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors max-w-md"
      >
        Добавить
      </button>
    </form>
  );
};
