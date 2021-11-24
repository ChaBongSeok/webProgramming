// 현재 페이지에서 매개변수로 받은 파라미터 키의 값을 리턴
const getParam = (param) => {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(`${param}`);
};

// html head에 제목 출력
const setPageTitle = (title) => {
  document.querySelector("#page-title").innerHTML = title;
};

// background image 출력
const setBgImg = (url) => {
  const back_image = document.querySelector(".back-image");
  back_image.style.backgroundImage = `url(${url})`;
};

// 대표 poster image 출력
const setRepresentativeImg = (url) => {
  const poster_image = document.querySelector(".representative-image");
  poster_image.src = url;
};

// body tag안 제목 출력
const setInfoTitle = (title) => {
  const info_title = document.querySelector(".info-title");
  info_title.innerHTML = title;
};

// 개요 출력
const setOverview = (overview) => {
  const overview_box = document.querySelector(".overview-box");
  const p = document.createElement("p");
  p.innerHTML = overview;
  overview_box.appendChild(p);
};

// 장르리스트 출력
const setGenreList = (genres) => {
  const genre_list = document.querySelector(".genre-list");
  genres.forEach((genre) => {
    const li = document.createElement("li");
    li.innerHTML = genre.name;
    genre_list.appendChild(li);
  });
};

// 평점과 투표수 출력
const setAverageAndCnt = (average, voteCount) => {
  const average_value = document.querySelector(".average-value");
  average_value.innerHTML = average;

  const average_vote_count = document.querySelector(".average-vote-count");
  average_vote_count.innerHTML = voteCount;
};

// runtime 시간 출력
const setRuntime = (runtime, categoryId) => {
  const article_title = document.querySelector(
    ".runtime-container > .article-title"
  );
  // 영화와 tv show를 구분해서 이름을 입력한다.
  article_title.innerHTML =
    categoryId === category.tv ? "에피소드 런타임" : "런타임";
  const runtime_box = document.querySelector(".runtime-box");
  const span = document.createElement("span");
  span.innerHTML = `${runtime}분`;
  runtime_box.appendChild(span);
};

// 현재 content의 상태 출력
const setStatus = (status) => {
  const span = document.createElement("span");
  span.innerHTML = status;

  const info_status = document.querySelector(".info-status");
  info_status.appendChild(span);
};

// 해당 content의 모든 poster image를 출력
const setPosterImgs = async (contentId, categoryId) => {
  let urls;
  const poster_box = document.querySelector(".poster-box");
  // tv show인지 영화인지 구분하여 api 함수 호출
  if (categoryId === category.tv) {
    urls = await tvShow.getPostersUrl(contentId);
  } else {
    urls = await movie.getPostersUrl(contentId);
  }
  // 가져온 모든 url들을 순회하면서 img tag로 만든 후 부모태그에 추가한다.
  urls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    poster_box.appendChild(img);
  });
};

// 북마크 해제시키는 함수
const checkedClickHandler = async (
  checkedBtn,
  uncheckedBtn,
  userId,
  contentId
) => {
  try {
    // table내에 user id, content id가 모두 같은 row를 찾아 삭제
    const res = await axios.post("../php/removeBookmark.php", {
      userId,
      contentId,
    });

    if (res.data) {
      // 삭제가 완료됐으면 버튼 display를 서로 바꾼다.
      checkedBtn.style.display = "none";
      uncheckedBtn.style.display = "block";
      alert("북마크를 삭제하였습니다.");
    } else {
      alert("북마크 삭제를 실패하였습니다.");
    }
  } catch (e) {
    alert("오류 발생");
  }
};

// 북마크 추가하는 함수
const uncheckedClickHandler = async (
  checkedBtn,
  uncheckedBtn,
  userId,
  contentId,
  contentName,
  categoryId
) => {
  try {
    // user id, category id, content id, content name으로 row를 추가
    const res = await axios.post("../php/addBookmark.php", {
      userId,
      categoryId,
      contentId,
      contentName,
    });

    if (res.data) {
      // 추가를 완료했으면 버튼을 서로 바꾼다.
      uncheckedBtn.style.display = "none";
      checkedBtn.style.display = "block";
      alert("북마크를 추가하였습니다.");
    } else {
      alert("북마크 추가를 실패하였습니다.");
    }
  } catch (e) {
    alert("오류 발생");
  }
};

// 처음 detail page를 열었을때 해당 content의 북마크 여부를 체크
const initBookmark = async (categoryId, contentId, title) => {
  // localstorage에서 로그인된 계정의 id를 가져온다.
  const userId = JSON.parse(localStorage.getItem("MovieAgora")).ID;
  // 로그인된 상태가 아니라면 바로 함수를 종료(버튼 2가지 모두 추가하지 않는다)
  if (!userId) {
    return;
  }

  try {
    const checkedBtn = document.querySelector(".checkedBtn");
    const uncheckedBtn = document.querySelector(".uncheckedBtn");

    // 2개의 버튼에 모두 click 이벤트를 적용한다.
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

    // user id, content id로 북마크 여부를 체크한다.
    const res = await axios.post("../php/bookMarkStatus.php", {
      userId,
      contentId,
    });
    // db에 해당 content가 북마크 되어 있을 때
    if (res.data) {
      checkedBtn.style.display = "block";
    } else {// 북마크 되어 있지 않을 때
      uncheckedBtn.style.display = "block";
    }
  } catch (e) {
    console.log(e);
  }
};

// content가 영화일 경우 화면에 data를 보여주는 함수
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
  // 페이지를 구성하는 데이터들을 추가
  initBookmark(categoryId, contentId, title);
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
};

// content가 tv show일 경우 화면에 data를 보여주는 함수
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
    // 페이지를 구성하는 데이터들을 추가
  initBookmark(categoryId, contentId, name);
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
};

const submitBtnClickHandler = async (contentId) => {
  const comment_field = document.querySelector(".comment-field");
  const new_comment = comment_field.value;
  try {
    const res = await axios.post("../php/createComment.php", {
      contentId,
      new_comment,
    });
  } catch (e) {
    alert("오류");
  }
};

// display페이지에 데이터를 동적으로 추가하는 함수
const displayDetail = async () => {
  // 파라미터 id 값을 가져온다.
  const contentId = getParam("id");
  // 파라미터 카테고리 id를 가져와서 정수형으로 바꿔준다.
  const categoryId = parseInt(getParam("category"));
  let data;

  // 영화와 tv show 각각 함수가 다르기 때문에 조건문으로 구분
  if (categoryId === category.movie) {
    // movie 객체 내의 getDetail함수를 호출
    data = await movie.getDetail(contentId);
    displayMovieDetail(data, contentId, categoryId);
  } else {
    // tvShow 객체 내의 getDetail함수를 호출
    data = await tvShow.getDetail(contentId);
    displayTvDetail(data, contentId, categoryId);
  }

  // 댓글
  const submit_button = document.querySelector(".submit-button");
  submit_button.addEventListener("click", () =>
    submitBtnClickHandler(contentId)
  );
};

// 처음 초기화 하는 함수
const init = () => {
  displayDetail();
};

init();
