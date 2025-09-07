import React, { useContext } from "react";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import ThemeContext from "../context/ThemeContext";

const ToggleButton = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  return (
    <div>
      <button
        onClick={() => setIsDark(!isDark)}
        className={`p-2 rounded-full transition-colors duration-500 ease-in-out   ${
          isDark ? `bg-black text-white` : `bg-white text-black`
        } border border-gray-500`}
      >
        <img src={isDark ? moon : sun} alt="" />
      </button>
    </div>
  );
};

export default ToggleButton;
