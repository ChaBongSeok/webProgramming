const trend_tv = document.querySelector(".trend-tv");
const trend_movie = document.querySelector(".trend-movie");

const displayTrend = async (api_function, location, category) => {
  const data = await api_function();
  data.forEach((trend) => {
    const { poster_path, id } = trend;
    const link = document.createElement("a");
    link.href = `detail.html?id=${id}&category_id=${category}`;
    link.className = "trend-content";
    const img = document.createElement("img");
    img.src = getImagePath(poster_path, 200);
    img.className = "trend-img";
    link.appendChild(img);
    location.appendChild(link);
  });
};

const displayGenre = async (api_function, category) => {
  const genres = await api_function();
  genres.forEach((genre) => {
    const { name, id } = genre;
    console.log(category);
    const newLink = document.createElement("a");
    // newLink.href = `sorting.html?genre_id=${id}&genre_name=${name}`;
    newLink.className = "genre";
    newLink.innerHTML = name;

    genreContainers[category].appendChild(newLink);
  });
};

const init = async () => {
  displayTrend(trend.getTrend_tv, trend_tv, category.tv);
  displayTrend(trend.getTrend_movie, trend_movie, category.movie);
};

init();
