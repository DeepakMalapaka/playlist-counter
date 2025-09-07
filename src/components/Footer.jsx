const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        
        {/* Left Side */}
        <p className="text-sm mb-2 sm:mb-0">
          © {new Date().getFullYear()} PlayList-Counter. All rights reserved.
        </p>
        
        {/* Right Side */}
        <p className="text-sm">
          Built by{" "}
          <a
            href="https://github.com/DeepakMalapaka"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:underline font-semibold"
          >
            Deepak Malapaka
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
