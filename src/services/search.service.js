import { SearchResults } from "@/models/SearchResults.model";

const MAX_RESULTS_PER_PAGE = 20;
const searchApiUrl = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getSearchResults = async (queryText) => {
  try {
    const response = await fetch(
      `${searchApiUrl}&q=${queryText}&maxResults=${MAX_RESULTS_PER_PAGE}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getModifiedSearchResults = async (queryText) => {
  return new SearchResults(await getSearchResults(queryText));
};

export { getModifiedSearchResults };
