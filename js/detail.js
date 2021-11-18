const getParam = (param) => {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(`${param}`);
};

const setPageTitle = (title) => {
  document.querySelector("#page-title").innerHTML = title;
};

const setBgImage = (url) => {
  const back_image = document.querySelector(".back-image");
  back_image.style.backgroundImage = `url(${url})`;
};

const setPosterImage = (url) => {
  const poster_image = document.querySelector(".poster-image");
  poster_image.src = url;
};

const setInfoTitle = (title) => {
  const info_title = document.querySelector(".info-title");
  info_title.innerHTML = title;
};

const setOverview = (overview) => {
  const overview_box = document.querySelector(".overview-box");
  const p = document.createElement("p");
  p.innerHTML = overview;
  overview_box.appendChild(p);
};

const setGenreList = (genres) => {
  const genre_list = document.querySelector(".genre-list");
  genres.forEach((genre) => {
    const li = document.createElement("li");
    li.innerHTML = genre.name;
    genre_list.appendChild(li);
  });
};

const setAverageAndCnt = (average, voteCount) => {
  const average_value = document.querySelector(".average-value");
  average_value.innerHTML = average;

  const average_vote_count = document.querySelector(".average-vote-count");
  average_vote_count.innerHTML = voteCount;
};

const setRuntime = (runtime, categoryId) => {
  const article_title = document.querySelector(
    ".runtime-container > .article-title"
  );
  article_title.innerHTML =
    categoryId === category.tv ? "에피소드 런타임" : "런타임";
  const runtime_box = document.querySelector(".runtime-box");
  const span = document.createElement("span");
  span.innerHTML = `${runtime}분`;
  runtime_box.appendChild(span);
};

const setStatus = (status) => {
  const span = document.createElement("span");
  span.innerHTML = status;

  const info_status = document.querySelector(".info-status");
  info_status.appendChild(span);
};

const setPoster = async (contentId, categoryId) => {
  let urls;
  if (categoryId === category.tv) {
    urls = await tvShow.getPostersUrl(contentId);
  } else {
    urls = await movie.getPostersUrl(contentId);
  }
};

const displayMovieDetail = (data, contentId, categoryId) => {
  const {
    title,
    overview,
    backdrop_path,
    poster_path,
    genres,
    vote_average,
    vote_count,
    runtime,
    status,
  } = data;
  setPageTitle(title);
  setBgImage(getImagePath(backdrop_path, 500));
  setPosterImage(getImagePath(poster_path));
  setInfoTitle(title);
  setOverview(overview);
  setGenreList(genres);
  setAverageAndCnt(vote_average, vote_count);
  setRuntime(runtime, categoryId);
  setStatus(status);
  setPoster(contentId, categoryId);
};

const displayTvDetail = (data, contentId, categoryId) => {
  const {
    name,
    overview,
    backdrop_path,
    poster_path,
    genres,
    vote_average,
    vote_count,
    episode_run_time,
    status,
  } = data;
  setPageTitle(name);
  setBgImage(getImagePath(backdrop_path, 500));
  setPosterImage(getImagePath(poster_path));
  setInfoTitle(name);
  setOverview(overview);
  setGenreList(genres);
  setAverageAndCnt(vote_average, vote_count);
  setRuntime(episode_run_time, categoryId);
  setStatus(status);
  setPoster(contentId, categoryId);
};

const displayDetail = async () => {
  const contentId = getParam("id");
  const categoryId = parseInt(getParam("category_id"));
  let data;

  if (categoryId === category.movie) {
    data = await movie.getDetail(contentId);
    displayMovieDetail(data, contentId, categoryId);
  } else {
    data = await tvShow.getDetail(contentId);
    displayTvDetail(data, contentId, categoryId);
  }
};

const init = () => {
  displayDetail();
};

init();
