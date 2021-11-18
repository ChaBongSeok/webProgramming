const trend_tv = document.querySelector(".trend-tv");
const trend_movie = document.querySelector(".trend-movie");
const genre_tv = document.querySelector(".genre-tv");
const genre_movie = document.querySelector(".genre-movie");
const login_button = document.querySelector(".loginButton");
const logout_button = document.querySelector(".logoutButton");
const myPage_button = document.querySelector(".myPageButton");

const displayTrend = async (apiFunction, parentNode, category) => {
  const data = await apiFunction();
  data.forEach((trend) => {
    const { poster_path, id } = trend;
    const link = document.createElement("a");
    link.href = `../html/detail.html?id=${id}&category_id=${category}`;
    link.className = "trend-content";
    const img = document.createElement("img");
    img.src = getImagePath(poster_path);
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
    link.href = `../html/category.html?category=${category}&genreId=${id}`;
    parentNode.appendChild(link);
  });
};

const setHeaderBtn = () => {
  const myEmail = localStorage.getItem("Email");
  if (myEmail) {
    login_button.style.display = "none";
    logout_button.style.display = "block";
    myPage_button.style.display = "block";
  } else {
    login_button.style.display = "block";
    logout_button.style.display = "none";
  }
};

const loginBtnClickHandler = () => {
  location.href = "../html/login.html";
};

const logoutBtnClickHandler = () => {
  logout();
};

const myPageBtnClickHandler = () => {
  location.href = "../html/myPage.html";
};

const init = async () => {
  setHeaderBtn();
  login_button.addEventListener("click", loginBtnClickHandler);
  logout_button.addEventListener("click", logoutBtnClickHandler);
  myPage_button.addEventListener("click", myPageBtnClickHandler);
  displayTrend(trend.getTrend_tv, trend_tv, category.tv);
  displayTrend(trend.getTrend_movie, trend_movie, category.movie);
  displayGenre(tvShow.getGenre, genre_tv, category.tv);
  displayGenre(movie.getGenre, genre_movie, category.movie);
};

init();
