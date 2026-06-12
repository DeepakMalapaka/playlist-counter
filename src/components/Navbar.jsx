import React, { useContext } from "react";
import ToggleButton from "./ToggleButton";
import play from "../assets/play.svg";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`flex justify-between items-center h-20 px-10 py-4 
                  fixed top-2 left-0 right-0 z-20
                  backdrop-blur-md border-b transition-colors ease-in-out rounded-2xl max-w-screen-lg mx-auto
                  ${
                    isDark
                      ? // 🌙 GitHub dark theme navbar
                        "bg-[#161b22]/80 text-[#c9d1d9] border-gray-700"
                      : // ☀️ Softer light theme navbar
                        "bg-[#f6f8fa]/80 text-[#24292f] border-gray-300"
                  }`}
    >
      {/* Logo & Name */}
      <div className="flex justify-center items-center gap-2">
        <span>
          <img src={play} alt="play" className="size-10" />
        </span>
        <span>
          <h1 className="font-bold text-2xl ">PlayList-Counter</h1>
        </span>
      </div>

      {/* Theme Toggle Button */}
      <div>
        <ToggleButton />
      </div>
    </div>
  );
};

export default Navbar;
