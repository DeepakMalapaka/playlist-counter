import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
const Footer = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <footer
      className={`${
        isDark
          ? "bg-[#161b22]/60 text-[#c9d1d9]"
          : "bg-[#f6f8fa]/70 text-[#24292f]"
      } py-4 mt-10`}
    >
      <div className="backdrop-blur-md container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
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
