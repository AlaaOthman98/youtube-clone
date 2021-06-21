const MAX_RESULTS_PER_PAGE = 20;
const playlistApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getPlaylistItems = async (playlistId, nextPageToken = "") => {
  let fullApiUrl = `${playlistApiUrl}&playlistId=${playlistId}&part=snippet&maxResults=${MAX_RESULTS_PER_PAGE}`;
  fullApiUrl += nextPageToken ? `&pageToken=${nextPageToken}` : "";

  try {
    const response = await fetch(fullApiUrl);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getPlaylistItems };
