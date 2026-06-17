import React, { useState } from "react";
import StatsContext from "./context/StatsContext";
import Navbar from "./components/Navbar";
import ThemeContext from "./context/ThemeContext";
import EnterInput from "./components/EnterInput";
import Stats from "./components/Stats";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
function App() {
  const [isDark, setIsDark] = useState(true);
  const [playListName, setPlayListName] = useState();
  const [contentCreator, setContentCreator] = useState();
  const [totalVideos, setTotalVideos] = useState();
  const [totalDuration, setTotalDuration] = useState();
  const [totalResults, setTotalResults] = useState();
  const [averageLength, setAverageLength] = useState();
  return (
    <StatsContext.Provider
      value={{
        playListName,
        setPlayListName,
        contentCreator,
        setContentCreator,
        totalVideos,
        setTotalVideos,
        totalDuration,
        setTotalDuration,
        totalResults,
        setTotalResults,
        averageLength,
        setAverageLength,
      }}
    >
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <ToastContainer
          position="top-right" // top-right, top-center, bottom-left etc.
          autoClose={3000} // time in ms before it closes
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" // "light", "dark", or "colored"
        />
        <div
          className={`min-h-screen transition-colors ease-in-out flex flex-col items-center px-4 pt-28 selection:bg-red-900/30 selection:text-red-500 ${
            isDark
              ? "bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9]"
              : "bg-gradient-to-br from-[#f6f8fa] via-[#ffffff] to-[#eaeef2] text-[#24292f]"
          }`}
        >
          <Navbar />

          <div
            className={`w-full sm:w-4/5 lg:w-3/5 text-center p-4 sm:p-6 rounded-xl 
              shadow-inner border transition-all duration-300 ease-in-out
              ${
                isDark
                  ? "bg-[#0d1117] border-gray-700 text-[#c9d1d9]"
                  : "bg-white border-gray-300 text-[#24292f]"
              }`}
          >
            <h2 className="font-semibold text-base sm:text-lg md:text-xl">
              YouTube Playlist Length Calculator
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
              Know exactly how long your YouTube playlists are — fast, clean,
              and hassle-free.
            </p>
          </div>
            {/* console.log('Running'); */}
          <EnterInput />
          <Stats />
          <Footer/>
        </div>
      </ThemeContext.Provider>
    </StatsContext.Provider>
  );
}

export default App;
