import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import StatsContext from "../context/StatsContext";
const Stats = () => {
  const { isDark } = useContext(ThemeContext);
  const {
    playListName,
    contentCreator,
    totalVideos,
    totalDuration,
    averageLength,
  } = useContext(StatsContext);
  function FormatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
}


  return (
    <div
      className={`mt-10 mb-5 w-full sm:w-4/5 lg:w-3/5 text-start p-6 rounded-2xl 
                  backdrop-blur-md shadow-lg border transition-colors duration-300 
                  ${
                    isDark
                      ? "bg-[#161b22]/60 border-gray-700 text-[#c9d1d9]"
                      : "bg-[#f6f8fa]/70 border-gray-300 text-[#24292f]"
                  }`}
    >
      {/* Header */}
      <div className="m-2">
        <div className="details text-center text-lg sm:text-xl font-bold mb-2">
          <span>🕵🏻 PlayList Details</span>
        </div>
        <div className="specs flex flex-col justify-center items-start font-semibold text-sm sm:text-base mb-5">
          <span>PlayList Name: {playListName || "Loading ..."}</span>
          <span>Content Creator: {contentCreator || "Loading ..."}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-gray-600 my-4"></div>

      {/* Stats */}
      <div className="heading text-center text-lg sm:text-xl font-bold">
        📊 PlayList-Statistics
      </div>
      <div className="lengthShow w-full flex flex-col sm:flex-row justify-center items-center gap-6 mt-5 mb-5">
        <div className="flex flex-col justify-center items-center border-2 border-gray-700 rounded-2xl p-3 w-full sm:w-60 h-32">
          <span className="font-bold text-base sm:text-xl">Total Videos</span>
          <span className="font-bold text-lg sm:text-xl">
            {totalVideos || "0"}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center border-2 border-gray-700 rounded-2xl p-3 w-full sm:w-60 h-32">
          <span className="font-bold text-base sm:text-xl">Total Duration</span>
          <span className="font-bold text-lg sm:text-xl">
            {totalDuration ? FormatDuration(totalDuration) : "Loading ..."}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center border-2 border-gray-700 rounded-2xl p-3 w-full sm:w-60 h-32">
          <span className="font-bold text-base sm:text-xl">Average Length</span>
          <span className="font-bold text-lg sm:text-xl">
            {averageLength
              ? FormatDuration(totalDuration / totalVideos)
              : "Loading ..."}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-gray-600 my-4"></div>

      {/* Playback Speed */}
      <div className="heading text-center text-lg sm:text-xl font-bold">
        ⚡ PlayBack Speed Options
      </div>
      <div className="lengthShow w-full flex flex-col sm:flex-row justify-center items-center gap-6 mt-5 mb-5">
        <div
          className={`flex flex-col justify-center items-center rounded-2xl p-3 w-full sm:w-60 h-32 ${
            isDark ? "bg-red-600 border-red-600" : "bg-red-500 border-red-500"
          }`}
        >
          <span className="font-bold text-sm sm:text-base">1.25x speed</span>
          <span className="font-bold text-xl sm:text-2xl">
            {totalDuration
              ? FormatDuration(totalDuration / 1.25)
              : "Loading ..."}
          </span>
        </div>
        <div
          className={`flex flex-col justify-center items-center rounded-2xl p-3 w-full sm:w-60 h-32 ${
            isDark ? "bg-red-600 border-red-600" : "bg-red-500 border-red-500"
          }`}
        >
          <span className="font-bold text-sm sm:text-base">1.5x speed</span>
          <span className="font-bold text-xl sm:text-2xl">
            {totalDuration
              ? FormatDuration(totalDuration / 1.5)
              : "Loading ..."}
          </span>
        </div>
        <div
          className={`flex flex-col justify-center items-center rounded-2xl p-3 w-full sm:w-60 h-32 ${
            isDark ? "bg-red-600 border-red-600" : "bg-red-500 border-red-500"
          }`}
        >
          <span className="font-bold text-sm sm:text-base">2.0x speed</span>
          <span className="font-bold text-xl sm:text-2xl">
            {totalDuration
              ? FormatDuration(totalDuration / 2.0)
              : "Loading ..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
