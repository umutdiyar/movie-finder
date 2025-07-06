import { Heart, Star, Calendar, Clock } from "lucide-react";

const MovieCard = ({
  movie,
  favorites,
  toggleFavorite,
  setSelectedMovie,
  genresMap,
}) => {
  const genreNames =
    movie.genre_ids && genresMap
      ? movie.genre_ids
          .map((id) => genresMap[id])
          .filter(Boolean)
          .join(", ")
      : "Tür yok";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => setSelectedMovie(movie)}
        />

        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          <span className="text-sm font-bold">
            {(movie.rating || 0).toFixed(1)}
          </span>
        </div>

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
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{movie.year || "-"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{movie.duration || "?"}</span>
          </div>
        </div>

        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
          {genreNames || "Tür yok"}
        </span>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {movie.description || "Açıklama yok"}
        </p>

        <button
          onClick={() => setSelectedMovie(movie)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Detayları Gör
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
