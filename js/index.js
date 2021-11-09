const trend_day = document.querySelector(".trend_day");
const trend_week = document.querySelector(".trend_week");
const tabs = document.querySelectorAll(".tabs > li");
const clickedTab = document.querySelector(".tabs > .active");
const contents = document.querySelectorAll(".tab__content > li");
const genreContainers = document.querySelectorAll(".genreContainer");

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
    const img = document.createElement("img");
    img.src = getImagePath(poster_path, 200);
    link.appendChild(img);
    location.appendChild(link);
  });
};

const tabClickHandler = (clickedTab) => {
  tabs.forEach((tab) => tab.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  const contentIdx = Array.from(clickedTab.target.parentNode.children).indexOf(
    clickedTab.target
  );
  contents[contentIdx].classList.add("active");
  clickedTab.target.classList.add("active");
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
  displayGenre(tvShow.getGenre, category.TV);
  displayGenre(movie.getGenre, category.MOVIE);
  tabs.forEach((tab) => tab.addEventListener("click", tabClickHandler));
};

init();
