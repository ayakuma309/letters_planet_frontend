import axios from "axios";

const KEY = process.env.NEXT_APP_YOUTUBE_API_KEY;

const params = {
  part: "snippet",
  maxResults: 20,
  key: KEY,
  regionCode: "JP",
  type: "video",
};

export const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: params,
});
//検索リスト取得
export const fetchSearchData = async (query: string) => {
  return await youtube.get("/search", {
    params: {
      ...params,
      q: query,
    },
  });
};
