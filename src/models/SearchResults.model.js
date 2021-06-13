class SearchResults {
  items;
  nextPageToken;
  totalResults;

  constructor(apiSearchResults) {
    this.setModifiedSearchResults(apiSearchResults);
  }

  setModifiedSearchResults(apiSearchResults) {
    this.items = apiSearchResults.items.map(
      (result) => new SearchResultsItem(result)
    );
    this.nextPageToken = apiSearchResults.nextPageToken;
    this.totalResults = apiSearchResults.pageInfo.totalResults;
  }
}

class SearchResultsItem {
  id;
  type;

  constructor(apiResult) {
    this.setModifiedSearchItem(apiResult);
  }

  setModifiedSearchItem(apiResult) {
    switch (apiResult.id.kind) {
      case "youtube#video":
        this.id = apiResult.id.videoId;
        this.type = "video";
        break;
      case "youtube#channel":
        this.id = apiResult.id.channelId;
        this.type = "channel";
        break;
      case "youtube#playlist":
        this.id = apiResult.id.playlistId;
        this.type = "playlist";
        break;
    }
  }
}

export { SearchResults };
