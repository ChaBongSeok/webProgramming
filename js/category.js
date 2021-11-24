const sorting_items = document.querySelector(".sorting-items");

const getParam = (param) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(`${param}`);
};

const category_id = parseInt(getParam("category")); // 영화는 0, tv는 1
const sorting_id = parseInt(getParam("sorting")); // 정렬 콘텐츠에만 값이 있음
const genre_id = parseInt(getParam("genreId"));

const displaySorting = async (apiFunction, parentNode) => {
  const data = await apiFunction();
  data.forEach((contents) => {
    const { poster_path, id } = contents;
    const link = document.createElement("a");
    link.href = `detail.html?id=${id}&category=${category_id}`;
    link.className = "sorting-content";
    const img = document.createElement("img");
    img.src = getImageUrl(poster_path, 200);
    img.className = "sorting-img";
    link.appendChild(img);
    parentNode.appendChild(link);
  });
};

const displayGenre = async (apiFunction, parentNode, genre_id) => {};

const displayCategoryContents = async (category_id, sorting_id, genre_id) => {
  if (sorting_id) {
    // sorting
    if (category_id === category.tv) {
      // tv
      switch (sorting_id) {
        case sorting.airingToday:
          await displaySorting(tvShow.getAiringToday, sorting_items);
          break;
        case sorting.popular:
          await displaySorting(tvShow.getPopular, sorting_items);
          break;
        case sorting.topRated:
          await displaySorting(tvShow.getTopRated, sorting_items);
      }
    } else {
      // movie
      switch (sorting_id) {
        case sorting.nowPlaying:
          await displaySorting(movie.getNowPlaying, sorting_items);
          break;
        case sorting.popular:
          await displaySorting(movie.getPopular, sorting_items);
          break;
        case sorting.topRated:
          await displaySorting(movie.getTopRated, sorting_items);
          break;
        case sorting.upComing:
          await displaySorting(movie.getUpComing, sorting_items);
      }
    }
  } else {
    // 장르 id
    if (category_id === category.tv) {
      await displayGenre(tvShow.getDiscover, genre_id);
    } else {
      await displayGenre(movie.getDiscover, genre_id);
    }
  }
};
const init = async () => {
  displayCategoryContents(category_id, sorting_id, genre_id);
  // displaySorting(tvShow.airingToday, sorting_items);
  console.log(getParam("title"));
};

init();
