import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Made with Created by{" "}
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
  );
}

export default Footer;
