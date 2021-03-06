import { VideoItem } from "@/models/video.model";

const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getVideoById = async (videoId) => {
  try {
    const response = await fetch(
      `${videoApiUrl}&part=snippet,player,statistics&id=${videoId}`
    );
    return new VideoItem(await response.json());
  } catch (error) {
    console.error(error);
  }
};

export { getVideoById };
