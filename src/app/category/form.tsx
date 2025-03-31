'use client'

export function CategoryForm() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex items-center justify-between w-full px-4 py-2 shadow-md">
        <h1 className="text-2xl font-bold">Categoria</h1>
      </div>
      <form className="w-full max-w-lg p-4 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </div>
  )
}