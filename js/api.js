const API_KEY = "6434c249f9a6bef6cfb5bb4aa624e097";
const TMDB_MAIN_ADDRESS = "api.themoviedb.org";
const LANGUAGE = "ko";

const getTmdbData = async (path, query = "", obj_dst = "results") => {
  try {
    const response = await axios.get(
      `https://${TMDB_MAIN_ADDRESS}/3${path}?api_key=${API_KEY}${query}`
    );
    if (response.status == 200) {
      return response.data[`${obj_dst}`];
    }
  } catch (e) {
    // TODO
    console.log(e);
  }
};

const getImagePath = (path, width = 200) =>
  `https://image.tmdb.org/t/p/w${width}${path}`;

const movie = {
  getNowPlaying: async (page) =>
    await getTmdbData(
      "/movie/now_playing",
      `&language=${LANGUAGE}&page=${page}`
    ),
  getPopular: async (page) =>
    await getTmdbData(
      "/movie/popular",
      `&language=${LANGUAGE}&page=${page}&region=kr`
    ),
  getTopRated: async (page) =>
    await getTmdbData(
      "/movie/top_rated",
      `&language=${LANGUAGE}&page=${page}&region=kr`
    ),
  getUpComing: async (page) =>
    await getTmdbData(
      "/movie/upcoming",
      `&language=${LANGUAGE}&page=${page}&region=kr`
    ),
  getDiscover: async (page, genre) =>
    await getTmdbData(
      "/discover/movie",
      `&language=${LANGUAGE}&sort_by=popularity.desc
        &include_adult=true&include_video=true&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`
    ),
  getGenre: async () =>
    await getTmdbData("/genre/movie/list", `&language=${LANGUAGE}`, "genres"),
};

const tvShow = {
  getAiringToday: async (page) =>
    await getTmdbData("/tv/airing_today", `&language=${LANGUAGE}&page=${page}`),
  getPopular: async (page) =>
    await getTmdbData("/tv/popular", `&language=${LANGUAGE}&page=${page}`),
  getTopRated: async (page) =>
    await getTmdbData("/tv/top_rated", `&language=${LANGUAGE}&page=${page}`),
  getDiscover: async (page, genre) =>
    await getTmdbData(
      "/discover/tv",
      `&language=${LANGUAGE}&sort_by=popularity.desc
        &include_adult=true&include_video=true&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`
    ),
  getGenre: async () =>
    await getTmdbData("/genre/tv/list", `&language=${LANGUAGE}`, "genres"),
};

const trend = {
  getTrend_day: async () => await getTmdbData("/trending/all/day"),
  getTrend_week: async () => await getTmdbData("/trending/all/week"),
};
