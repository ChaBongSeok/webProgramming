const trend_day = document.querySelector(".trend-day");
const trend_week = document.querySelector(".trend-week");

const category = {
  TV: 0,
  MOVIE: 1,
};

const displayTrend = async (api_function, location) => {
  const data = await api_function();
  data.map((trend) => {
    const { poster_path, id } = trend;
    const link = document.createElement("a");
    link.href = `detail.html?id=${id}`;
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

const init = () => {
  displayTrend(trend.getTrend_day, trend_day);
  displayTrend(trend.getTrend_week, trend_week);
};

init();
