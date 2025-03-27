import React, { useState } from "react";
import { useForm } from "react-hook-form";
import createBg from "../assets/login.jpg";
import { useModal } from "../ContextApi/Modal/ModalContext";
import { useToast, Spinner, Box } from "@chakra-ui/react";
import { url2 } from "../api";

const CreateVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const { showModal } = useModal();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleCreateEvent = async (data) => {
    setLoading(true); 
    const formattedData = new FormData();
    formattedData.append("title", data.name);
    formattedData.append("description", data.description);
    formattedData.append("tags", data.tags);
    if (videoFile) {
      formattedData.append("video", videoFile);
    }

    try {
      let jwt = JSON.parse(localStorage.getItem("token"));
      const res = await fetch(`${url2}video/upload`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
        body: formattedData,
      });

      const responseData = await res.json();
      if (res.status === 201) {
        toast({
          title: "Contest created successfully",
          description: responseData.message,
          status: "success",
          isClosable: true,
        });
        reset();
        setVideoFile(null);
      } else {
        toast({
          title: "Failed to create contest",
          description: responseData.error || "Something went wrong.",
          status: "error",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred",
        description: "Unable to create the contest. Please try again later.",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    showModal({
      body: <p>Do you want to create this Event?</p>,
      onSave: () => handleCreateEvent(data),
    });
  };

  return (
    <div
      className="bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 mt-16 relative h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${createBg})` }}
    >
      
      {loading && (
        <Box
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
        >
          <Spinner size="xl" color="white" />
        </Box>
      )}

      <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Upload Video
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-900 mb-1">Title</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
              placeholder="Enter title of the video"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-900 mb-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
              placeholder="Describe the hackathon"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-900 mb-1">Tags</label>
            <input
              type="text"
              {...register("tags", { required: "Tags name is required" })}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
              placeholder="Enter tags"
            />
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
            )}
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-gray-900 mb-1">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
            />
            {videoFile && (
              <p className="text-gray-600 text-sm mt-1">Selected Video: {videoFile.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVideo;
