import { SearchResults } from "@/models/search-results.model";

const MAX_RESULTS_PER_PAGE = 20;
const searchApiUrl = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getSearchResults = async (queryText, pageToken = "", type = "") => {
  const fullApiUrl = getFullApiUrl(queryText, pageToken, type);

  try {
    const response = await fetch(fullApiUrl);
    return new SearchResults(await response.json());
  } catch (error) {
    console.error(error);
  }
};

const getFullApiUrl = (...apiArguments) => {
  let fullApiUrl = `${searchApiUrl}&q=${apiArguments[0]}&maxResults=${MAX_RESULTS_PER_PAGE}`;

  fullApiUrl += apiArguments[1] ? `&pageToken=${apiArguments[1]}` : "";

  fullApiUrl += apiArguments[2] ? `&type=${apiArguments[2]}` : "";

  return fullApiUrl;
};

export { getSearchResults };
