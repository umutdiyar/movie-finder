import { Heart } from "lucide-react";

const Navbar = ({
  showFavorites,
  setShowFavorites,
  favorites = [],
  total = 0,
  onHomeClick, // Anasayfaya dönüş için yeni prop
}) => {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick(); // Ana component'ten gelen reset fonksiyonunu çağır
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1
            className="text-3xl font-bold text-gray-900 cursor-pointer transition-colors"
            onClick={handleHomeClick}
          >
            🎬 MovieFinder
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFavorites
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart size={16} fill={showFavorites ? "currentColor" : "none"} />
              Favoriler ({favorites.length})
            </button>
            <div className="text-sm text-gray-500">{total} film bulundu</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
