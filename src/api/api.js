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
    genre_ids: movie.genre_ids || [],
    duration: "?", // Detaydan alınabilir
  };
}

export async function searchMovie(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results?.map(formatMovie) || [];
}

export async function fetchGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=tr-TR`
  );
  const data = await response.json();
  return data.genres || [];
}

export async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=tr-TR`
  );
  const data = await response.json();
  return {
    plot: data.overview,
    runtime: data.runtime,
  };
}

export async function fetchMovieCredits(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=tr-TR`
  );
  const data = await response.json();
  const director =
    data.crew.find((person) => person.job === "Director")?.name || "Bilinmiyor";
  const cast = data.cast.slice(0, 6).map((actor) => actor.name);
  return { director, cast };
}

export async function fetchPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=1`
  );
  const data = await res.json();
  return data.results?.map(formatMovie) || [];
}
