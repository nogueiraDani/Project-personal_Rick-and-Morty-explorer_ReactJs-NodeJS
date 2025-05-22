export function Pagination({
  goToPreviousPage,
  prevPageUrl,
  currentPage,
  goToNextPage,
  nextPageUrl,
  totalPages,
}) {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={goToPreviousPage}
        disabled={!prevPageUrl}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          !prevPageUrl ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Página Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={!nextPageUrl}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          !nextPageUrl ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Próxima Página
      </button>
    </div>
  );
}
