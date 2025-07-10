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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo ve Başlık */}
          <h1
            className="text-2xl sm:text-3xl font-bold text-gray-900 cursor-pointer transition-colors hover:text-red-500 text-center sm:text-left"
            onClick={handleHomeClick}
          >
            🎬 Film Bulucu
          </h1>

          {/* Butonlar ve Bilgiler */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            {/* Favoriler Butonu */}
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm sm:text-base order-1 sm:order-2 ${
                showFavorites
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart size={16} fill={showFavorites ? "currentColor" : "none"} />
              <span className="whitespace-nowrap">
                Favoriler ({favorites.length})
              </span>
            </button>

            {/* Film Sayısı - Mobilde üstte */}
            <div className="text-sm text-gray-500 text-center sm:text-left order-1 sm:order-2">
              <span className="sm:hidden">Toplam: </span>
              {total} film bulundu
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
