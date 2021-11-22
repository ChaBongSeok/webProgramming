const API_KEY = "6434c249f9a6bef6cfb5bb4aa624e097";
const TMDB_MAIN_ADDRESS = "api.themoviedb.org";
const LANGUAGE = "ko-KR";

/**
 *
 * @param {string} path
 * @param {string} query
 * @param {string} obj_dst
 * @returns {array}
 */
const getTmdbData = async (path, query = "", obj_dst = "results") => {
  try {
    const response = await axios.get(
      `https://${TMDB_MAIN_ADDRESS}/3${path}?api_key=${API_KEY}${query}`
    );
    if (response.status == 200) {
      return obj_dst ? response.data[`${obj_dst}`] : response.data;
    } else {
      alert("데이터를 불러오지 못하였습니다.");
    }
  } catch (e) {
    alert("오류 발생");
  }
};

const getImagePath = (path, width = 200) =>
  `https://image.tmdb.org/t/p/w${width}${path}`;

const movie = {
  getDetail: async (movieId) =>
    await getTmdbData(`/movie/${movieId}`, `&language=${LANGUAGE}`, null),
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
  getUrlsOfVideo: async (movieId) => {
    const movies = await getTmdbData(`/movie/${movieId}/videos`);
    const urls = movies.map((movie) => {
      const { id } = movie;
      return `https://www.youtube.com/embed/watch?v/${id}`;
    });
    return urls;
  },
  getPostersUrl: async (movieId) => {
    const posters = await getTmdbData(
      `/movie/${movieId}/images`,
      "",
      "posters"
    );
    const urls = posters.map((poster) => {
      const { file_path } = poster;
      return getImagePath(file_path);
    });
    return urls;
  },
};

const tvShow = {
  getDetail: async (tvId) =>
    await getTmdbData(`/tv/${tvId}`, `&language=${LANGUAGE}`, null),
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
  getUrlsOfVideo: async (tvId) => {
    const shows = await getTmdbData(`/tv/${tvId}/videos`);
    const urls = shows.map((show) => {
      const { id } = show;
      return `https://www.youtube.com/embed/watch?v/${id}`;
    });
    return urls;
  },
  getPostersUrl: async (tvId) => {
    const posters = await getTmdbData(`/tv/${tvId}/images`, "", "posters");
    const urls = posters.map((poster) => {
      const { file_path } = poster;
      return getImagePath(file_path);
    });
    return urls;
  },
};

const trend = {
  getTrend_tv: async () => await getTmdbData("/trending/tv/week"),
  getTrend_movie: async () => await getTmdbData("/trending/movie/week"),
};
