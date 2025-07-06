const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/no-image.jpg",
    year: movie.release_date?.split("-")[0],
    rating: movie.vote_average,
    description: movie.overview,
    genre_ids: movie.genre_ids,
    duration: "?", // TMDB duration başka endpoint'te, istersen sonra ekleriz
  };
}

export const searchMovie = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=tr-TR&query=${query}`
  );
  const data = await response.json();
  return data.results.map(formatMovie); // 👈 burada da
};

export const fetchGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=tr-TR`
  );
  const data = await response.json();
  return data.genres;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=tr-TR`
  );
  const data = await response.json();
  return {
    plot: data.overview,
    director: data.director || "Yönetmen bilgisi yok", // Bunu ayrı çekeceğiz aşağıda
  };
};

export const fetchMovieCredits = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=tr-TR`
  );
  const data = await response.json();
  const director =
    data.crew.find((person) => person.job === "Director")?.name || "Bilinmiyor";
  const cast = data.cast.slice(0, 6).map((actor) => actor.name);
  return { director, cast };
};
