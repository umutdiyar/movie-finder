import React, { useState, useEffect } from "react";
import {
  Search,
  Star,
  Calendar,
  Clock,
  Heart,
  X,
  Filter,
  ArrowLeft,
} from "lucide-react";

const MovieFinder = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);

  // Genişletilmiş film verileri
  const sampleMovies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      year: 1994,
      rating: 9.3,
      genre: "Drama",
      duration: "142 min",
      director: "Frank Darabont",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      poster:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/7T2SDS5efuJiK45oyKoEzf9RKjw.jpg",
      backdrop:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/7T2SDS5efuJiK45oyKoEzf9RKjw.jpg",
      description:
        "İki hapishane mahkumu yıllar içinde arkadaşlık kurar ve nihayetinde barış ve kurtarış bulur.",
      plot: "Andy Dufresne, eşini ve sevgilisini öldürmekten suçlu bulunarak Shawshank Devlet Hapishanesi'ne gönderilir. Burada Ellis Boyd 'Red' Redding ile arkadaşlık kurar ve yavaş yavaş hapishane yaşamına alışır. Andy'nin zekası ve kararlılığı, hem kendisine hem de diğer mahkumlara yeni umutlar getirir.",
      popular: true,
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      rating: 9.2,
      genre: "Crime",
      duration: "175 min",
      director: "Francis Ford Coppola",
      cast: ["Marlon Brando", "Al Pacino", "James Caan"],
      poster:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/vseIVRdN4xasYwStQIi6SI7DcEu.jpg",
      backdrop:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/vseIVRdN4xasYwStQIi6SI7DcEu.jpg",
      description:
        "Güçlü bir İtalyan-Amerikan suç ailesinin yaşlı patriyarki kontrolünü en küçük oğluna devreder.",
      plot: "Vito Corleone, New York'ta yaşayan İtalyan asıllı bir mafya babasıdır. Kızının düğün günü, işlerini halletmeye çalışırken, en küçük oğlu Michael'ın ailenin işlerine karışmaması için çaba sarf eder. Ancak bir suikast girişimi her şeyi değiştirir.",
      popular: true,
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      genre: "Action",
      duration: "152 min",
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      poster:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/7IPCEr7ifdH5CtU97QG7XgAAtOp.jpg",
      backdrop:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/7IPCEr7ifdH5CtU97QG7XgAAtOp.jpg",
      description:
        "Batman, Joker adlı anarşist suçlu ile Gotham City'yi kurtarmak için mücadele eder.",
      plot: "Batman, Commissioner Gordon ve Harvey Dent ile birlikte Gotham'ı organize suçtan temizlemeye çalışır. Ancak Joker adında kaotik bir suçlu ortaya çıkar ve şehri anarşiye sürükler. Batman, ahlaki değerleri ile sınırlarını test eden bir savaşa girer.",
      popular: true,
    },

    {
      id: 4,
      title: "The Matrix",
      year: 1999,
      rating: 8.7,
      genre: "Sci-Fi",
      duration: "136 min",
      director: "Lana Wachowski, Lilly Wachowski",
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      poster:
        "	https://media.themoviedb.org/t/p/w300_and_h450_bestv2/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
      backdrop:
        "	https://media.themoviedb.org/t/p/w300_and_h450_bestv2/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
      description:
        "Bir bilgisayar programcısı, gerçekliğin aslında bir simülasyon olduğunu keşfeder.",
      plot: "Neo, gündüzleri sıradan bir programcı, geceleri ise hacker olan genç bir adamdır. Morpheus adlı gizemli bir adamla tanışınca, yaşadığı dünyanın aslında Matrix adı verilen bir simülasyon olduğunu öğrenir ve insanlığı kurtarma misyonuna katılır.",
      popular: false,
    },

    {
      id: 5,
      title: "Forrest Gump",
      year: 1994,
      rating: 8.8,
      genre: "Drama",
      duration: "142 min",
      director: "Robert Zemeckis",
      cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      poster:
        "	https://media.themoviedb.org/t/p/w300_and_h450_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      backdrop:
        "	https://media.themoviedb.org/t/p/w300_and_h450_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      description: "Düşük IQ'lu ama iyi kalpli bir adamın hayatının hikayesi.",
      plot: "Alabama'lı Forrest Gump, düşük IQ'suna rağmen yaşamında olağanüstü başarılara imza atar. Vietnam Savaşı'ndan ping-pong şampiyonluğuna, koşudan iş dünyasına kadar birçok alanda iz bırakır ve sevdiği kadın Jenny için mücadele eder.",
      popular: true,
    },
    {
      id: 6,
      title: "Inception",
      year: 2010,
      rating: 8.7,
      genre: "Sci-Fi",
      duration: "148 min",
      director: "Christopher Nolan",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
      poster:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/xn0Kcg4e6p0mLxVS3nAWhNmW2Ni.jpg",
      backdrop:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/xn0Kcg4e6p0mLxVS3nAWhNmW2Ni.jpg",
      description:
        "Rüya paylaşım teknolojisini kullanarak kurumsal sırları çalmaya çalışan bir hırsız.",
      plot: "Dom Cobb, insanların bilinçaltına girip sırlarını çalabilen usta bir hırsızdır. Ona imkansız bir görev verilir: Inception. Bir fikri çalmak yerine, bir fikir yerleştirmek zorundadır. Bu son iş, onu sevdiklerine kavuşturacaktır.",
      popular: true,
    },

    {
      id: 7,
      title: "The Piyanist",
      year: 2003,
      rating: 8.8,
      genre: "Drama",
      duration: "150 min",
      director: "Roman Polanski",
      cast: ["Adrien Brody", "Thomas Kretschmann", "Frank Finlay"],
      poster:
        "	https://media.themoviedb.org/t/p/w300_and_h450_bestv2/8gdOy6vd1lK2KyakZroETXyB4re.jpg",
      backdrop:
        "	https://media.themoviedb.org/t/p/w300_and_h450_bestv2/8gdOy6vd1lK2KyakZroETXyB4re.jpg",
      description: "Müzik tutkusuydu. Hayatta kalmak başyapıtıydı.",
      plot: "Wladyslaw Szpilman, Polonyalı başarılı bir piyanisttir. İkinci Dünya Savaşı'nda Almanların Polonya'yı işgal etmesiyle hayatı kâbusa döner. Musevi olduğu halde şans eseri toplama kamplarına gitmekten kurtulur ve Varşova'nın gettolarında yaşamaya başlar. Acı ve sefalet dolu yaşamı, bir gün bir Alman subayının ona yardıma gelmesi ve onu oradan kurtarmasıyla değişir.",
      popular: true,
    },

    {
      id: 8,
      title: "Goodfellas",
      year: 1990,
      rating: 8.7,
      genre: "Crime",
      duration: "146 min",
      director: "Martin Scorsese",
      cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
      poster:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/oMPDt1rNLYEVRpigNLaiTnibVn8.jpg",
      backdrop:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/oMPDt1rNLYEVRpigNLaiTnibVn8.jpg",
      description:
        "Bir adamın mafya dünyasındaki yükselişi ve düşüşünün hikayesi.",
      plot: "Henry Hill, çocukluğundan beri mafya dünyasına özenen bir adamdır. Jimmy Conway ve Tommy DeVito ile birlikte suç dünyasında yükselir. Ancak zamanla bu yaşamın bedeli ağır olmaya başlar ve Henry zor kararlar vermek zorunda kalır.",
      popular: false,
    },
  ];

  const genres = ["all", "Drama", "Crime", "Action", "Sci-Fi"];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMovies(sampleMovies);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMovies = movies.filter((movie) => {
    if (showFavorites) {
      return favorites.includes(movie.id);
    }
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const popularMovies = movies.filter((movie) => movie.popular);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const MovieCard = ({ movie }) => (
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
          <span className="text-sm font-bold">{movie.rating}</span>
        </div>
        <button
          onClick={() => toggleFavorite(movie.id)}
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
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{movie.duration}</span>
          </div>
        </div>

        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
          {movie.genre}
        </span>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {movie.description}
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

  const MovieModal = ({ movie, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Star size={16} fill="currentColor" />
                {movie.rating}
              </span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                {movie.genre}
              </span>
              <p className="text-gray-600 mb-4">{movie.description}</p>
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
              <p className="text-gray-700 mb-4">{movie.plot}</p>

              <h3 className="font-bold text-lg mb-2">Yönetmen</h3>
              <p className="text-gray-700 mb-4">{movie.director}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Oyuncular</h3>
              <div className="space-y-2">
                {movie.cast.map((actor, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
        >
          <div className="w-full h-64 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">🎬 MovieFinder</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFavorites
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
                }`}
              >
                <Heart
                  size={16}
                  fill={showFavorites ? "currentColor" : "none"}
                />
                Favoriler ({favorites.length})
              </button>
              <div className="text-sm text-gray-500">
                {filteredMovies.length} film bulundu
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
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
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre === "all" ? "Tüm Türler" : genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Popular Movies Section */}
        {!showFavorites && !searchTerm && selectedGenre === "all" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔥 Popüler Filmler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {popularMovies.slice(0, 5).map((movie) => (
                <div
                  key={movie.id}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-end">
                    <div className="text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="font-bold text-sm mb-1">{movie.title}</h3>
                      <div className="flex items-center gap-1">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
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

        {/* Movies Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* No Results */}
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

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <footer className="bg-white border-t border-gray-200 py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Made with Created by{" "}
              <a
                href="https://github.com/umutdiyar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Umut Diyar Balcı
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MovieFinder;
