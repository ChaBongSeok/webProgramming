// GET 방식으로 통신할때 url에 있는 파라미터 중
// 매개변수로 넘어온 이름의 파라미터 값을 반환한다.
const getParam = (param) => {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(`${param}`);
};

const setPageTitle = (title) => {
  document.querySelector("#page-title").innerHTML = title;
};

const setBgImg = (url) => {
  const back_image = document.querySelector(".back-image");
  back_image.style.backgroundImage = `url(${url})`;
};

const setRepresentativeImg = (url) => {
  const poster_image = document.querySelector(".representative-image");
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

const setPosterImgs = async (contentId, categoryId) => {
  let urls;
  const poster_box = document.querySelector(".poster-box");
  if (categoryId === category.tv) {
    urls = await tvShow.getPostersUrl(contentId);
  } else {
    urls = await movie.getPostersUrl(contentId);
  }
  urls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    poster_box.appendChild(img);
  });
};

const checkedClickHandler = async (
  checkedBtn,
  uncheckedBtn,
  userId,
  contentId
) => {
  const res = await axios.post("../php/removeBookmark.php", {
    userId,
    contentId,
  });

  if (res.data) {
    checkedBtn.style.display = "none";
    uncheckedBtn.style.display = "block";
    alert("북마크를 삭제하였습니다.");
  } else {
    alert("북마크 삭제를 실패하였습니다.");
  }
};

const uncheckedClickHandler = async (
  checkedBtn,
  uncheckedBtn,
  userId,
  contentId,
  contentName,
  categoryId
) => {
  const res = await axios.post("../php/addBookmark.php", {
    userId,
    categoryId,
    contentId,
    contentName,
  });

  if (res.data) {
    uncheckedBtn.style.display = "none";
    checkedBtn.style.display = "block";
    alert("북마크를 추가하였습니다.");
  } else {
    alert("북마크 추가를 실패하였습니다.");
  }
};

const initBookmark = async (categoryId, contentId, title) => {
  const userId = JSON.parse(localStorage.getItem("MovieAgora")).ID;
  if (!userId) {
    return;
  }

  try {
    const checkedBtn = document.querySelector(".bookmark-column .checkedBtn");
    const uncheckedBtn = document.querySelector(
      ".bookmark-column .uncheckedBtn"
    );

    checkedBtn.addEventListener("click", () =>
      checkedClickHandler(checkedBtn, uncheckedBtn, userId, contentId)
    );
    uncheckedBtn.addEventListener("click", () =>
      uncheckedClickHandler(
        checkedBtn,
        uncheckedBtn,
        userId,
        contentId,
        title,
        categoryId
      )
    );

    const res = await axios.post("../php/bookMarkStatus.php", {
      userId,
      contentId,
    });
    if (res.data) {
      checkedBtn.style.display = "block";
    } else {
      uncheckedBtn.style.display = "block";
    }
  } catch (e) {
    console.log(e);
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
  setBgImg(getImageUrl(backdrop_path, 500));
  setRepresentativeImg(getImageUrl(poster_path));
  setInfoTitle(title);
  setOverview(overview);
  setGenreList(genres);
  setAverageAndCnt(vote_average, vote_count);
  setRuntime(runtime, categoryId);
  setStatus(status);
  setPosterImgs(contentId, categoryId);
  initBookmark(categoryId, contentId, title);
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
  setBgImg(getImageUrl(backdrop_path, 500));
  setRepresentativeImg(getImageUrl(poster_path));
  setInfoTitle(name);
  setOverview(overview);
  setGenreList(genres);
  setAverageAndCnt(vote_average, vote_count);
  setRuntime(episode_run_time, categoryId);
  setStatus(status);
  setPosterImgs(contentId, categoryId);
  initBookmark(categoryId, contentId, name);
};

// detail페이지에 데이터를 뿌려주는 함수이다.
// 영화와 TV Show는 서로 함수가 다르기 때문에
// if문으로 구분하였다.
const displayDetail = async () => {
  // 파라미터 id 값을 가져온다.
  const contentId = getParam("id");
  // 파라미터 카테고리 id를 가져와서 정수형으로 바꿔준다.
  const categoryId = parseInt(getParam("category"));
  let data;

  // 카테고리가 영화라면
  // 영화 디테일함수를, TV Show라면 TV Show 디테일함수를 호출한다.
  // 영화, TV Show는 결과 값으로 받은 객체 내부의 키이름도 서로 다르기 때문에
  // 각각 다른 함수를 호출한다.
  if (categoryId === category.movie) {
    data = await movie.getDetail(contentId);
    displayMovieDetail(data, contentId, categoryId);
  } else {
    data = await tvShow.getDetail(contentId);
    displayTvDetail(data, contentId, categoryId);
  }
};

// 초기화 하는 함수이다.
const init = () => {
  displayDetail();
};

init();
