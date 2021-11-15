const trend_tv = document.querySelector(".trend-tv");
const trend_movie = document.querySelector(".trend-movie");
const genre_tv = document.querySelector(".genre-tv");
const genre_movie = document.querySelector(".genre-movie");

const displayTrend = async (apiFunction, parentNode, category) => {
  const data = await apiFunction();
  data.forEach((trend) => {
    const { poster_path, id } = trend;
    const link = document.createElement("a");
    link.href = `detail.html?id=${id}&category_id=${category}`;
    link.className = "trend-content";
    const img = document.createElement("img");
    img.src = getImagePath(poster_path, 200);
    img.className = "trend-img";
    link.appendChild(img);
    parentNode.appendChild(link);
  });
};

const displayGenre = async (apiFunction, parentNode, category) => {
  const genres = await apiFunction();
  genres.forEach((genre) => {
    const { name, id } = genre;
    const link = document.createElement("a");
    link.innerHTML = name;
    link.href = `category.html?category=${category}&genreId=${id}&genreName=${name}`;
    parentNode.appendChild(link);
  });
};

const init = async () => {
  displayTrend(trend.getTrend_tv, trend_tv, category.tv);
  displayTrend(trend.getTrend_movie, trend_movie, category.movie);
  displayGenre(tvShow.getGenre, genre_tv, category.tv);
  displayGenre(movie.getGenre, genre_movie, category.movie);
};

init();
