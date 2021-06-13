import { PlaylistItem } from "@/models/playlist.model";

const playlistApiUrl = `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getPlaylistById = async (playlistId) => {
  try {
    const response = await fetch(
      `${playlistApiUrl}&part=snippet,contentDetails&id=${playlistId}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getModifiedPlaylistItem = async (playlistId) => {
  return new PlaylistItem(await getPlaylistById(playlistId));
};

export { getModifiedPlaylistItem };
