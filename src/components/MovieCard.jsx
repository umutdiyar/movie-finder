import { Heart, Star, Calendar, Clock } from "lucide-react";

const MovieCard = ({
  movie,
  favorites,
  toggleFavorite,
  setSelectedMovie,
  genresMap,
}) => {
  const genreNames = movie.genre_ids.map((id) => genresMap[id]).filter(Boolean);

  // Açıklama alternatifleri
  const getMovieDescription = () => {
    if (movie.description) return movie.description;

    // Açıklama yoksa alternatif bilgiler göster
    const alternatives = [];

    if (movie.year) alternatives.push(`${movie.year} yapımı`);
    if (genreNames.length > 0)
      alternatives.push(`${genreNames.join(", ")} türünde`);
    if (movie.director) alternatives.push(`Yönetmen: ${movie.director}`);
    if (movie.cast && movie.cast.length > 0)
      alternatives.push(`Oyuncular: ${movie.cast.slice(0, 2).join(", ")}`);

    return alternatives.length > 0
      ? alternatives.join(" ") + " bir film."
      : "Bu film hakkında detaylı bilgi için tıklayın.";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-60 object-cover cursor-pointer"
          onClick={() => setSelectedMovie(movie)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie.id);
          }}
          className={`absolute top-2 left-2 p-2 rounded-full transition-colors ${
            favorites.includes(movie.id)
              ? "bg-red-500 text-white"
              : "bg-white/80 text-red-500 hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart
            size={16}
            fill={favorites.includes(movie.id) ? "currentColor" : "none"}
          />
        </button>
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
          <Star size={14} fill="currentColor" />
          {(movie.rating || 0).toFixed(1)}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 mb-1">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 text-gray-600 text-sm mb-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{movie.year || "-"}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {genreNames.length > 0 ? (
            genreNames.map((genre, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md cursor-pointer hover:bg-blue-800 hover:text-white"
              >
                {genre}
              </span>
            ))
          ) : (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
              Tür yok
            </span>
          )}
        </div>

        <p
          className={`text-sm line-clamp-3 flex-grow mb-4 ${
            movie.description ? "text-gray-700" : "text-gray-500 italic"
          }`}
        >
          {getMovieDescription()}
        </p>

        {/* Buton container - her zaman alt kısımda kalacak */}
        <div className="mt-auto pt-2">
          <button
            onClick={() => setSelectedMovie(movie)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors duration-200"
          >
            Detayları Gör
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
