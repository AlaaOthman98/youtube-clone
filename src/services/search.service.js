import { SearchResults } from "@/models/search-results.model";

const MAX_RESULTS_PER_PAGE = 20;
const searchApiUrl = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.VUE_APP_YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS_PER_PAGE}`;

const getSearchResults = async (
  queryText,
  pageToken = "",
  type = "",
  publishedAfter = ""
) => {
  const fullApiUrl = getFullApiUrl(queryText, pageToken, type, publishedAfter);

  try {
    const response = await fetch(fullApiUrl);
    return new SearchResults(await response.json());
  } catch (error) {
    console.error(error);
  }
};

const getResultsRelatedToVideo = async (videoId) => {
  const fullApiUrl = `${searchApiUrl}&part=snippet&relatedToVideoId=${videoId}&type=video`;

  try {
    const response = await fetch(fullApiUrl);
    return new SearchResults(await response.json());
  } catch (error) {
    console.error(error);
  }
};

const getFullApiUrl = (...queryParams) => {
  const [queryText, pageToken, type, publishedAfter] = queryParams;
  let fullApiUrl = `${searchApiUrl}&q=${queryText}`;

  fullApiUrl += pageToken ? `&pageToken=${pageToken}` : "";

  fullApiUrl += type ? `&type=${type}` : "";

  fullApiUrl += publishedAfter ? `&publishedAfter=${publishedAfter}` : "";

  return fullApiUrl;
};

export { getSearchResults, getResultsRelatedToVideo };
