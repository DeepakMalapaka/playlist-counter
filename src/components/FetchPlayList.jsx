import axios from "axios";
import { useContext } from "react";
import playButton from "../assets/playButton.svg";
import ThemeContext from "../context/ThemeContext";
import FormContext from "../context/FormContext";
import StatsContext from "../context/StatsContext";
import { toast } from "react-toastify";



function FetchPlayList() {
  // Parse ISO-8601 duration like PT1H2M3S (days supported)
  function parseDuration(duration) {
    if (!duration) return 0;
    const regex = /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const m = duration.match(regex);
    if (!m) return 0;
    const d = parseInt(m[1] || "0", 10);
    const h = parseInt(m[2] || "0", 10);
    const min = parseInt(m[3] || "0", 10);
    const s = parseInt(m[4] || "0", 10);
    return d * 86400 + h * 3600 + min * 60 + s;
  }

  const { isDark } = useContext(ThemeContext);
  const { playListURL, start, end } = useContext(FormContext);
  const {
    setPlayListName,
    setContentCreator,
    setTotalVideos,
    setAverageLength,
    setTotalDuration,
  } = useContext(StatsContext);

  const getPlayListId = (url) => {
    try {
      const u = new URL(url);
      return u.searchParams.get("list");
    } catch (e) {
      console.error("Cannot find playListId:", e);
      return null;
    }
  };

  // Fetch *all* video IDs from the playlist (handles >50 with pagination)
  const fetchAllVideoIds = async (playlistId) => {
    let ids = [];
    let nextPageToken;
    do {
      const { data } = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "contentDetails",
            maxResults: 50,
            playlistId,
            key: import.meta.env.VITE_API_KEY,
            ...(nextPageToken ? { pageToken: nextPageToken } : {}),
          },
        }
      );

      const batchIds = (data.items || [])
        .map((it) => it?.contentDetails?.videoId)
        .filter(Boolean);
      ids.push(...batchIds);

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return ids;
  };

  const handleFetch = async () => {
    const playListId = getPlayListId(playListURL);
    if (!playListId) {
      toast.error("Invalid playlist URL ❌");
      return;
    }

    try {
      // 1) Fetch metadata (name/creator)
      const meta = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlists",
        { params: { part: "snippet", id: playListId, key: import.meta.env.VITE_API_KEY } }
      );
      const metaItem = meta.data?.items?.[0];
      if (metaItem) {
        setPlayListName(metaItem.snippet?.title || "Untitled playlist");
        setContentCreator(metaItem.snippet?.channelTitle || "Unknown");
      }

      // 2) Fetch all video IDs
      const allVideoIds = await fetchAllVideoIds(playListId);
      if (allVideoIds.length === 0) {
        toast.error("No public videos found in this playlist ❌");
        return;
      }

      // 3) Apply start/end (1-based, END IS INCLUSIVE)
      const s = Math.max(1, parseInt(start, 10) || 1);
      const e = Math.min(allVideoIds.length, parseInt(end, 10) || allVideoIds.length);
      const startIndex = s - 1;
      const endIndex = e - 1;

      if (startIndex > endIndex) {
        toast.error("Invalid range ❌ (start must be ≤ end)");
        return;
      }

      const selectedVideoIds = allVideoIds.slice(startIndex, endIndex + 1);
      // Show the count for the *selected* range
      setTotalVideos(selectedVideoIds.length);

      // 4) Fetch durations in chunks of 50
      let totalSeconds = 0;
      for (let i = 0; i < selectedVideoIds.length; i += 50) {
        const chunk = selectedVideoIds.slice(i, i + 50).join(",");
        const { data } = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          { params: { part: "contentDetails", id: chunk, key: import.meta.env.VITE_API_KEY } }
        );

        for (const v of data.items || []) {
          totalSeconds += parseDuration(v?.contentDetails?.duration);
        }
      }

      // 5) Save results (range only)
      const avgSeconds =
        selectedVideoIds.length > 0 ? totalSeconds / selectedVideoIds.length : 0;

      setTotalDuration(totalSeconds);
      setAverageLength(avgSeconds);

      toast.success("Playlist range calculated successfully! 😊");
    } catch (error) {
      const apiMessage =
        error?.response?.data?.error?.message || error?.message || "Unknown error";
      console.error("handleFetch error:", apiMessage, error?.response?.data);
      // Give a friendlier message for common cases
      if (/quota/i.test(apiMessage)) {
        toast.error("YouTube API quota exceeded. Try again later. ⏳");
      } else if (/API key/i.test(apiMessage) || /permission/i.test(apiMessage)) {
        toast.error("API key error. Check your YouTube Data API key/config. 🔑");
      } else if (/pageToken/i.test(apiMessage)) {
        toast.error("Page token error. Please try again. 🔁");
      } else {
        toast.error(`Something went wrong: ${apiMessage}`);
      }
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
