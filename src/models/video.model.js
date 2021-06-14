class VideoItem {
  id;
  title;
  type;
  description;
  publishedAt;
  thumbnails;
  channelTitle;
  viewCount;

  constructor(apiVideo) {
    this.setModifiedVideo(apiVideo);
  }

  setModifiedVideo(apiVideo) {
    this.id = apiVideo.items[0].id;
    this.type = "video";
    this.title = apiVideo.items[0].snippet.title;
    this.description = apiVideo.items[0].snippet.description;
    this.publishedAt = apiVideo.items[0].snippet.publishedAt;
    this.thumbnails = {
      defaultUrl: apiVideo.items[0].snippet.thumbnails.default.url,
      mediumUrl: apiVideo.items[0].snippet.thumbnails.medium.url,
      highUrl: apiVideo.items[0].snippet.thumbnails.high.url,
    };
    this.channelTitle = apiVideo.items[0].snippet.channelTitle;
    this.viewCount = apiVideo.items[0].statistics.viewCount;
  }
}

export { VideoItem };

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
      statistics {
          viewCount: number,
          likeCount: number,
          dislikeCount: number,
          favoriteCount: number,
          commentCount: number
        }
    }
  ]
}

*/
