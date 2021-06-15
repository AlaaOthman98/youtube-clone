import { SearchResults } from "@/models/search-results.model";

const MAX_RESULTS_PER_PAGE = 20;
const searchApiUrl = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getSearchResults = async (queryText, pageToken = "") => {
  const fullApiUrl = pageToken
    ? `${searchApiUrl}&q=${queryText}&maxResults=${MAX_RESULTS_PER_PAGE}&pageToken=${pageToken}`
    : `${searchApiUrl}&q=${queryText}&maxResults=${MAX_RESULTS_PER_PAGE}`;
  try {
    const response = await fetch(fullApiUrl);
    return new SearchResults(await response.json());
  } catch (error) {
    console.error(error);
  }
};

export { getSearchResults };
