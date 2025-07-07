import { Search, Filter, ArrowLeft } from "lucide-react";

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  genres,
  showFavorites,
  setShowFavorites,
  filteredMovies,
  loading,
  setSelectedMovie,
  children,
}) => {
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {!showFavorites && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Film ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="sm:w-48 relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none"
              >
                <option value="all">Tüm Türler</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Başlık */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {showFavorites ? "❤️ Favori Filmlerim" : "🎭 Tüm Filmler"}
        </h2>
        {showFavorites && (
          <button
            onClick={() => setShowFavorites(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Geri Dön
          </button>
        )}
      </div>

      {/* Film Kartları */}
      {loading ? (
        <div className="text-center text-gray-500">Yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {children}
        </div>
      )}

      {/* Sonuç Yok */}
      {!loading && filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            {showFavorites ? "💔" : "🎭"}
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {showFavorites
              ? "Henüz favori film eklemediniz"
              : "Film bulunamadı"}
          </h3>
          <p className="text-gray-500">
            {showFavorites
              ? "Film kartlarındaki kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz."
              : "Arama kriterlerinizi değiştirip tekrar deneyin."}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
