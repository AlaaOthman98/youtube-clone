import { ChannelItem } from "@/models/channel.model";

const channelApiUrl = `https://www.googleapis.com/youtube/v3/channels?key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const getChannelById = async (channelId) => {
  try {
    const response = await fetch(
      `${channelApiUrl}&part=snippet,brandingSettings,statistics&id=${channelId}`
    );
    return new ChannelItem(await response.json());
  } catch (error) {
    console.error(error);
  }
};

export { getChannelById };
