import React, { useEffect, useState } from "react";
import { X, Star, Heart } from "lucide-react";
import { fetchMovieDetails, fetchMovieCredits } from "../api/api";

const MovieModal = ({
  movie,
  onClose,
  favorites = [],
  toggleFavorite,
  genresMap = {},
}) => {
  const [details, setDetails] = useState({ plot: "", director: "" });
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movie?.id) return;

    const loadDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movie.id);
        const movieCredits = await fetchMovieCredits(movie.id);

        setDetails({
          plot: movieDetails.plot,
          director: movieCredits.director,
        });
        setCast(movieCredits.cast);
      } catch (err) {
        console.error("Detay verisi alınamadı:", err);
      }
    };

    loadDetails();
  }, [movie?.id]);

  const genreNames = movie.genre_ids
    ?.map((id) => genresMap[id])
    .filter(Boolean)
    .join(", ");

  // Modal dışına tıklanınca kapatma fonksiyonu
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="relative">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star
                  size={16}
                  fill="currentColor"
                  className="text-yellow-400"
                />
                {movie.rating?.toFixed(1) || "?"}
              </span>
              <span>{movie.year || "-"}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                {genreNames || "Tür yok"}
              </span>
              <p className="text-gray-600 mb-4">
                {movie.description || "Açıklama yok."}
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(movie.id)}
              className={`p-3 rounded-full transition-colors ${
                favorites.includes(movie.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-red-500 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart
                size={20}
                fill={favorites.includes(movie.id) ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Hikaye</h3>
              <p className="text-gray-700 mb-4">
                {details.plot || "Yükleniyor..."}
              </p>

              <h3 className="font-bold text-lg mb-2">Yönetmen</h3>
              <span className="inline-block mt-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 cursor-pointer hover:bg-gray-700 hover:text-gray-100">
                {details.director || "Yükleniyor..."}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Oyuncular</h3>
              <div className="space-y-2 flex flex-wrap">
                {cast.length > 0 ? (
                  cast.map((actor, index) => (
                    <span
                      key={index}
                      className="inline-block mt-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
                    >
                      {actor}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Yükleniyor...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
