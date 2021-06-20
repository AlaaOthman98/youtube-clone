class PlaylistItem {
  id;
  type;
  title;
  description;
  publishedAt;
  thumbnails;
  channelId;
  channelTitle;
  itemCount;

  constructor(apiPlaylist) {
    this.setModifiedPlaylist(apiPlaylist);
  }

  setModifiedPlaylist(apiPlaylist) {
    this.id = apiPlaylist.items[0].id;
    this.type = "playlist";
    this.title = apiPlaylist.items[0].snippet.title;
    this.description = apiPlaylist.items[0].snippet.description;
    this.publishedAt = apiPlaylist.items[0].snippet.publishedAt;
    this.thumbnails = {
      defaultUrl: apiPlaylist.items[0].snippet.thumbnails.default.url,
      mediumUrl: apiPlaylist.items[0].snippet.thumbnails.medium.url,
      highUrl: apiPlaylist.items[0].snippet.thumbnails.high.url,
    };
    this.channelId = apiPlaylist.items[0].snippet.channelId;
    this.channelTitle = apiPlaylist.items[0].snippet.channelTitle;
    this.itemCount = apiPlaylist.items[0].contentDetails.itemCount;
  }
}

export { PlaylistItem };

// API response hierarchy
/*
response {
  items [
    {
      id: string,
      snippet {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails {
          default {
            url
          },
          medium {
            url
          },
          high {
            url
          }
        },
        channelTitle: string,
      },
      contentDetails {
          itemCount: number
        }
    }
  ]
}

*/
