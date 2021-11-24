const items_container = document.querySelector(".items-container");

const getParam = (param) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(`${param}`);
};

const category_id = parseInt(getParam("category")); // 영화는 0, tv는 1
const sorting_id = parseInt(getParam("sorting")); // 정렬 콘텐츠에만 값이 있음
const genre_id = parseInt(getParam("genreId")); // 장르 id값

const display = async (apiFunction) => {
  const data = await apiFunction();
  data.forEach((contents) => {
    const { poster_path, id } = contents;
    const link = document.createElement("a");
    link.href = `detail.html?id=${id}&category=${category_id}`;
    link.className = "content";
    const img = document.createElement("img");
    img.src = getImageUrl(poster_path, 300);
    img.className = "content-img";
    link.appendChild(img);
    items_container.appendChild(link);
  });
};

const displayCategoryContents = async () => {
  if (sorting_id) {
    // sorting
    if (category_id === category.tv) {
      // tv
      switch (sorting_id) {
        case sorting.airingToday:
          await display(tvShow.getAiringToday);
          break;
        case sorting.popular:
          await display(tvShow.getPopular);
          break;
        case sorting.topRated:
          await display(tvShow.getTopRated);
      }
    } else {
      // movie
      switch (sorting_id) {
        case sorting.nowPlaying:
          await display(movie.getNowPlaying);
          break;
        case sorting.popular:
          await display(movie.getPopular);
          break;
        case sorting.topRated:
          await display(movie.getTopRated);
          break;
        case sorting.upComing:
          await display(movie.getUpComing);
      }
    }
  } else {
    // 장르 id
    if (category_id === category.tv) {
      await display(() => tvShow.getDiscover(1, genre_id));
    } else {
      await display(() => movie.getDiscover(1, genre_id));
    }
  }
};
const init = async () => {
  displayCategoryContents();
};

init();
