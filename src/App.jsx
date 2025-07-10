import React, { useState, useEffect } from "react";
import { fetchGenres, searchMovie, fetchPopularMovies } from "./api/api";
import Navbar from "./components/Navbar";
import SearchFilters from "./components/SearchFilters";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [genres, setGenres] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function loadData() {
      const g = await fetchGenres();
      setGenres(g);

      setLoading(true);

      try {
        let data = [];

        if (searchTerm.trim() === "") {
          data = await fetchPopularMovies();
        } else {
          data = await searchMovie(searchTerm.trim());
        }

        setMovies(data);
      } catch (e) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [searchTerm]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === movie.id);
      if (exists) {
        return prev.filter((f) => f.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const toggleFavoriteInModal = (movie) => {
    toggleFavorite(movie);
    // Eğer favorilerden çıkarılıyorsa ve favoriler sayfasındaysak modalı kapat
    const isCurrentlyFavorite = favorites.find((f) => f.id === movie.id);
    if (isCurrentlyFavorite && showFavorites) {
      setSelectedMovie(null);
    }
  };

  // Tür id → isim map'i
  const genresMap = genres.reduce((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  const filteredMovies = (showFavorites ? favorites : movies).filter((m) => {
    if (selectedGenre !== "all" && !m.genre_ids.includes(Number(selectedGenre)))
      return false;

    if (
      searchTerm.trim() !== "" &&
      !m.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    return true;
  });

  const handleHomeClick = () => {
    setSearchTerm(""); // Arama terimini temizle
    setSelectedGenre("all"); // Genre seçimini sıfırla
    setShowFavorites(false); // Favoriler görünümünü kapat
  };

  const isFavorite = selectedMovie
    ? favorites.some((f) => f.id === selectedMovie.id)
    : false;

  const shouldShowNoResultsMessage =
    !loading && filteredMovies.length === 0 && !showFavorites;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        favorites={favorites}
        total={filteredMovies.length}
        onHomeClick={handleHomeClick}
      />

      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        filteredMovies={filteredMovies}
        loading={loading}
        setSelectedMovie={setSelectedMovie}
      />

      {loading ? (
        <div className="text-center p-4">Yükleniyor...</div>
      ) : shouldShowNoResultsMessage ? (
        <div className="text-center p-4 text-red-800">Film bulunamadı!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 px-8">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites.map((f) => f.id)}
              toggleFavorite={() => toggleFavorite(movie)}
              setSelectedMovie={setSelectedMovie}
              genresMap={genresMap}
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          genresMap={genresMap}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite}
          toggleFavorite={() => toggleFavoriteInModal(selectedMovie)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
