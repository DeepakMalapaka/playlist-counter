import React, { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import FormContext from "../context/FormContext";
import FetchPlayList from "./FetchPlayList";
import Link from "../assets/Link.svg"

const EnterInput = () => {
  const { isDark } = useContext(ThemeContext);
  const [playListURL, setPlayListURL] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <FormContext.Provider
      value={{ playListURL, setPlayListURL, start, setStart, end, setEnd }}
    >
      <div
        className={`mt-10 w-full sm:w-4/5 lg:w-3/5 text-start p-6 rounded-2xl 
        backdrop-blur-md shadow-lg border transition-colors duration-300 
        ${
          isDark
            ? "bg-[#161b22]/60 border-gray-700 text-[#c9d1d9]"
            : "bg-[#f6f8fa]/70 border-gray-300 text-[#24292f]"
        }`}
      >
        <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
          Enter YouTube playlist URL
          <img src={Link} alt="" className="size-8"/>
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
            console.log({ playListURL, start, end });
          }}
          className="space-y-5"
        >
          {/* Playlist URL */}
          <input
            type="url"
            placeholder="Paste your playlist link here..."
            className={`w-full p-3 rounded-xl text-sm sm:text-base 
            shadow-inner border focus:outline-none focus:ring-2 
            transition-all duration-300
            ${
              isDark
                ? "bg-[#0d1117] border-gray-700 text-[#c9d1d9] placeholder-gray-400 focus:ring-blue-500"
                : "bg-white border-gray-300 text-[#24292f] placeholder-gray-500 focus:ring-blue-400"
            }`}
            onChange={(e) => setPlayListURL(e.target.value)}
          />

          {/* Range inputs */}
          <div className="range flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              placeholder="start"
              min={1}
              value={start}
              className={`w-full sm:w-1/2 p-3 rounded-xl text-sm sm:text-base 
                shadow-inner border focus:outline-none focus:ring-2 
                transition-all duration-300
                ${
                  isDark
                    ? "bg-[#0d1117] border-gray-700 text-[#c9d1d9] placeholder-gray-400 focus:ring-blue-500"
                    : "bg-white border-gray-300 text-[#24292f] placeholder-gray-500 focus:ring-blue-400"
                }`}
              onChange={(e) => {
                const value =e.target.value? Math.max(1, Number(e.target.value)):" ";
                setStart(value);
              }}
            />
            <input
              type="number"
              placeholder="end"
              min={1}
              value={end}
              className={`w-full sm:w-1/2 p-3 rounded-xl text-sm sm:text-base 
                shadow-inner border focus:outline-none focus:ring-2 
                transition-all duration-300
                ${
                  isDark
                    ? "bg-[#0d1117] border-gray-700 text-[#c9d1d9] placeholder-gray-400 focus:ring-blue-500"
                    : "bg-white border-gray-300 text-[#24292f] placeholder-gray-500 focus:ring-blue-400"
                }`}
              onChange={(e) => {
                const value = e.target.value?Math.max(1, Number(e.target.value)):" ";
                setEnd(value);
              }}
            />
          </div>
        </form>

        {/* Submit Button */}
        <FetchPlayList />
      </div>
    </FormContext.Provider>
  );
};

export default EnterInput;
