class ChannelItem {
  id;
  title;
  description;
  publishedAt;
  thumbnails;
  viewCount;
  subscriberCount;
  videoCount;
  bannerUrl;

  constructor(apiChannel) {
    this.setModifiedChannel(apiChannel);
  }

  setModifiedChannel(apiChannel) {
    this.id = apiChannel.items[0].id;
    this.title = apiChannel.items[0].snippet.title;
    this.description = apiChannel.items[0].snippet.description;
    this.publishedAt = apiChannel.items[0].snippet.publishedAt;
    this.thumbnails = {
      defaultUrl: apiChannel.items[0].snippet.thumbnails.default.url,
      mediumUrl: apiChannel.items[0].snippet.thumbnails.medium.url,
      highUrl: apiChannel.items[0].snippet.thumbnails.high.url,
    };
    this.viewCount = apiChannel.items[0].statistics.viewCount;
    this.subscriberCount = apiChannel.items[0].statistics.subscriberCount;
    this.videoCount = apiChannel.items[0].statistics.videoCount;
    this.bannerUrl =
      apiChannel.items[0].brandingSettings.image.bannerExternalUrl;
  }
}

export { ChannelItem };

//API response hierarchy

/*
response {
  items [
    {
      snippet {
        title: string,
        description: string,
        thumbnails: {
          default: {
            url: string
          },
          medium: {
            url: string
          },
          high {
            url: string
          }
        }
      },
      statistics {
        viewCount: number,
        subscriberCount: number,
        videoCount: number

      },
      brandingSettings {
        image {
          bannerExternalUrl: string
        }
      }
    }
  ]
}

*/
