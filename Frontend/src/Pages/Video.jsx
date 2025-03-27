import React, { useEffect, useState } from "react";
import { useToast, Spinner, Input, Button } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import { url2 } from "../api"; 

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); 
  const [searchDate, setSearchDate] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  // Function to fetch videos from the API
  const fetchVideos = async () => {
    setLoading(true);
    try {
      let jwt = JSON.parse(localStorage.getItem("token"));
      const formattedDate = searchDate ? new Date(searchDate).toISOString().split("T")[0] : "";

      const res = await fetch(
        `${url2}video/?search=${debouncedSearch}&date=${formattedDate}&page=${page}&limit=8`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setVideos(data.videos);
        setTotalPages(data.totalPages || 1);
      } else {
        throw new Error(data.error || "Failed to fetch videos");
      }
    } catch (error) {
      toast({
        title: "Error fetching videos",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
    setLoading(false);
  };

  // Debouncing for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 800); 

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch videos when filters (search, date, page) change
  useEffect(() => {
    fetchVideos();
  }, [debouncedSearch, searchDate, page]);

  
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown Date";
    const date = new Date(dateStr);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  
  const formatTags = (tags) => {
    if (!tags || !Array.isArray(tags)) return "";
    return tags.map((tag) => `#${tag.replace(/[^a-zA-Z0-9]/g, "").trim()}`).join(" ");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6">📹 User Videos</h2>

      {/*  Search & Date Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center mt-10">
        <Input
          placeholder="🔍 Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-md bg-gray-800 text-white text-center"
        />
        <Input
          type="date"
          value={searchDate}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSearchDate(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-md bg-gray-800 text-white text-center"
        />
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner size="xl" color="blue.500" />
        </div>
      )}

      {/* Video Grid */}
      {!loading && videos.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-14">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-gray-800 rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => setSelectedVideo(video)}
            >
              <video
                src={`${url2}uploads/${video.filePath}`}
                className="w-full h-40 object-cover rounded-md"
                controls={false}
              />
              <h3 className="mt-2 text-lg font-semibold text-blue-400">{video.title}</h3>
              <p className="text-sm text-gray-300 mt-1 italic">{video.description}</p>
              <p className="text-xs text-gray-500 mt-2">📅 {formatDate(video.uploadDate)}</p>
              <p className="text-xs text-green-400 mt-1">{formatTags(video.tags)}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-400">❌ No videos found</p>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-xl w-full text-center">
            <h2 className="text-2xl font-bold mb-4">{selectedVideo.title}</h2>
            <video
              src={`${url2}uploads/${selectedVideo.filePath}`}
              className="w-full rounded-lg"
              controls
              autoPlay
            />
            <p className="text-gray-400 mt-2">{selectedVideo.description}</p>
            <p className="text-xs text-gray-500 mt-2">📅 {formatDate(selectedVideo.uploadDate)}</p>
            <p className="text-xs text-green-400 mt-1">{formatTags(selectedVideo.tags)}</p>
            <button
              className="mt-4 px-6 py-2 bg-red-500 rounded-md hover:bg-red-600 transition"
              onClick={() => setSelectedVideo(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      
      <div className="flex justify-center items-center mt-10 py-4">
        <Button
          leftIcon={<FaArrowLeft />}
          isDisabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-700 text-white mx-2 px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          Prev
        </Button>
        <span className="text-lg font-bold mx-4">{page} / {totalPages}</span>
        <Button
          rightIcon={<FaArrowRight />}
          isDisabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-700 text-white mx-2 px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Video;

