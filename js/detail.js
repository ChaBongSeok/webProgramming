const back_image = document.querySelector(".back-image");
const poster_image = document.querySelector(".poster-image");
const info_title = document.querySelector(".info-title");
const info_overview = document.querySelector(".info-overview");

const getParam = (param) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(`${param}`);
};

const setPageTitle = (title) => {
  document.querySelector("#page-title").innerHTML = title;
};

const displayMovieDetail = (data) => {
  const { title, overview, backdrop_path, poster_path } = data;
  setPageTitle(title);
  back_image.style.backgroundImage = `url(${getImagePath(backdrop_path, 500)})`;
  poster_image.src = getImagePath(poster_path, 200);
  info_title.innerHTML = title;
  info_overview.innerHTML = overview
};

const displayTvDetail = (data) => {
  const { name, overview, backdrop_path, poster_path } = data;
  setPageTitle(name);
  back_image.style.backgroundImage = `url(${getImagePath(backdrop_path, 500)})`;
  poster_image.src = getImagePath(poster_path, 200);
  info_title.innerHTML = name;
  info_overview.innerHTML = overview
};

const displayDetail = async () => {
  const contentId = getParam("id");
  const categoryId = getParam("category_id");
  let data;

  if (parseInt(categoryId) === category.movie) {
    data = await movie.getDetail(contentId);
    displayMovieDetail(data);
  } else {
    data = await tvShow.getDetail(contentId);
    displayTvDetail(data);
  }
};

const init = () => {
  displayDetail();
};

init();
