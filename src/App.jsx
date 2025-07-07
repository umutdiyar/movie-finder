import React, { useState, useEffect } from "react";
import { fetchGenres, searchMovie } from "./api/api";
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

  // Türleri yükle
  useEffect(() => {
    async function loadInitial() {
      const g = await fetchGenres();
      setGenres(g);
    }
    loadInitial();
  }, []);

  // Arama veya showFavorites değiştiğinde film verisini güncelle
  useEffect(() => {
    const query = searchTerm.trim() === "" ? "a" : searchTerm.trim();

    setLoading(true);
    searchMovie(query)
      .then((data) => {
        setMovies(data);
      })
      .catch(() => {
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  // Favori ekleme/çıkarma fonksiyonu
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Tür id → isim map'i
  const genresMap = genres.reduce((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  // Filtrelenmiş film listesi: favoriler, tür ve arama kriterlerine göre
  const filteredMovies = movies.filter((m) => {
    if (showFavorites && !favorites.includes(m.id)) return false;

    if (selectedGenre !== "all" && !m.genre_ids.includes(Number(selectedGenre)))
      return false;

    if (
      searchTerm.trim() !== "" &&
      !m.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        favorites={favorites}
        total={filteredMovies.length}
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
      ) : filteredMovies.length === 0 ? (
        <div className="text-center p-4 text-red-800">Film bulunamadı!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 px-8">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
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
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
