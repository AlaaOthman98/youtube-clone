import { PlaylistItem } from "@/models/playlist.model";
import router from "../router";

const MAX_RESULTS_PER_PAGE = 1000;
const playlistApiUrl = `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getPlaylistById = async (playlistId) => {
  try {
    const response = await fetch(
      `${playlistApiUrl}&part=snippet,contentDetails&id=${playlistId}`
    );
    return new PlaylistItem(await response.json());
  } catch (error) {
    console.error(error);
    router.push({ name: "notFound" });
  }
};

const getPlaylistsByChannelId = async (channelId) => {
  try {
    const response = await fetch(
      `${playlistApiUrl}&part=snippet,contentDetails&channelId=${channelId}&maxResults=${MAX_RESULTS_PER_PAGE}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    router.push({ name: "notFound" });
  }
};

export { getPlaylistById, getPlaylistsByChannelId };
