const searchApiUrl = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getSearchResults = async (queryText) => {
  try {
    const response = await fetch(`${searchApiUrl}&q=${queryText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getSearchResults };
