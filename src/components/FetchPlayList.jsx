import axios from "axios";
import { useContext } from "react";
import playButton from "../assets/playButton.svg";
import ThemeContext from "../context/ThemeContext";
import FormContext from "../context/FormContext";
import StatsContext from "../context/StatsContext";
import { toast } from "react-toastify";

const API_KEY = "AIzaSyBq31nlKfRkg-NEW-OmRuyYBEfxNX9xY2s";

function FetchPlayList() {
  // Parsing ISO 8601 duration (PT#H#M#S)
  function parseDuration(duration) {
    if (!duration) return 0;
    const regex = /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);

    if (!matches) return 0;

    const days = parseInt(matches[1] || "0", 10);
    const hours = parseInt(matches[2] || "0", 10);
    const minutes = parseInt(matches[3] || "0", 10);
    const seconds = parseInt(matches[4] || "0", 10);

    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
  }

  const { isDark } = useContext(ThemeContext);
  const { playListURL } = useContext(FormContext);
  const {
    setPlayListName,
    setContentCreator,
    setTotalVideos,
    setAverageLength,
    setTotalDuration,
  } = useContext(StatsContext);

  const getPlayListId = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get("list");
    } catch (error) {
      console.error("Cannot find playListId: " + error);
    }
  };

  const handleFetch = async () => {
    const playListId = getPlayListId(playListURL);
    if (!playListId) {
      toast.error("Invalid playlist URL ❌");
      return;
    }

    try {
      let allVideoIds = [];
      let nextPageToken = "";
      let totalResults = 0;

      // Loop until there are no more pages
      do {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playListId}&key=${API_KEY}&pageToken=${nextPageToken}`
        );

        const items = res.data.items;
        totalResults = res.data.pageInfo.totalResults;

        allVideoIds.push(...items.map((item) => item.contentDetails.videoId));
        nextPageToken = res.data.nextPageToken || "";
      } while (nextPageToken);

      toast.success("The PlayList is fetched successfully! 😊");

      // Save total videos count
      setTotalVideos(totalResults);

      // Get playlist metadata (title, channel)
      const details = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playListId}&key=${API_KEY}`
      );

      if (details.data.items.length > 0) {
        setPlayListName(details.data.items[0].snippet.title);
        setContentCreator(details.data.items[0].snippet.channelTitle);
      }

      // Fetch video durations in chunks of 50 (API limit)
      let totalSeconds = 0;
      for (let i = 0; i < allVideoIds.length; i += 50) {
        const chunk = allVideoIds.slice(i, i + 50).join(",");
        const videoRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${chunk}&key=${API_KEY}`
        );

        videoRes.data.items.forEach((video) => {
          totalSeconds += parseDuration(video.contentDetails.duration);
        });
      }

      const avgSeconds = totalSeconds / totalResults;

      // Save raw seconds in state
      setTotalDuration(totalSeconds);
      setAverageLength(avgSeconds);
    } catch (error) {
      console.error("Cannot get data in handleFetch: " + error);
      toast.error("Something went wrong 🤧");
    }
  };

  return (
    <div className="mt-5">
      <button
        type="button"
        className={`w-full p-3 rounded-xl text-sm sm:text-base 
            shadow-inner border focus:outline-none focus:ring-2 
            transition-all duration-300 flex justify-center items-center
            ${
              isDark
                ? "bg-red-600 border-red-600 text-[#c9d1d9]"
                : "bg-red-500 border-red-500 text-[#000000]"
            }`}
        onClick={handleFetch}
      >
        <img src={playButton} alt="playButton" className="w-5 h-5 mr-2" />
        Get Your PlayList Length
      </button>
    </div>
  );
}

export default FetchPlayList;
