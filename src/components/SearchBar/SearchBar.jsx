// TODO: parei aqui - tem o passo a passo no deepseek

export function SearchBar({
    handleNameSearch,
    inputName,
    setInputName,
    nameFilter,
    handleClearSearch
}) {

    return (
      <form onSubmit={handleNameSearch}>
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Buscar por Nome:
        </label>
        <div className="flex">
          <input
            id="name"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Digite o nome do personagem"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Buscar
          </button>
          {nameFilter && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Limpar
            </button>
          )}
        </div>
      </form>
    );
}