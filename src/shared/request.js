// api/main/database 로 먼저 접근해야함.
const API_KEY = "f1b3ce8e1384f5a32ac1bd0529a805f1";

export const requestTMDB = [
  {
    title: "넷플릭스 오리지널",
    url: `/discover/tv?api_key=${API_KEY}&language=ko&with_networks=213`,
  },
  {
    title: "지금 뜨는 콘텐츠",
    url: `/trending/all/week?api_key=${API_KEY}&language=ko`,
  },
  {
    title: "높은 평점의 인기 영화",
    url: `/movie/top_rated?api_key=${API_KEY}&language=ko`,
  },
  {
    title: "미스터리",
    url: `/discover/movie?api_key=${API_KEY}&language=ko&with_genres=9648`,
  },
  {
    title: "음악",
    url: `/discover/movie?api_key=${API_KEY}&language=ko&with_genres=10402`,
  },
];

export const request = [
  { title: "videoKey", url: `/api/main/movie/video` },
  { title: "액션", url: `/api/main/movie/genre/28` },
  { title: "판타지", url: `/api/main/movie/genre/14` },
  { title: "코미디", url: `/api/main/movie/genre/35` },
  { title: "스릴러", url: `/api/main/movie/genre/53` },
  { title: "공상과학", url: `/api/main/movie/genre/878` },
  { title: "애니메이션", url: `/api/main/movie/genre/16` },
  { title: "호러", url: `/api/main/movie/genre/27` },
  { title: "다큐멘터리", url: `/api/main/movie/genre/99` },
  { title: "드라마", url: `/api/main/movie/genre/18` },
  { title: "가족", url: `/api/main/movie/genre/27` },
  { title: "역사", url: `/api/main/movie/genre/36` },
  { title: "전쟁", url: `/api/main/movie/genre/80` },
  { title: "범죄", url: `/api/main/movie/genre/27` },
  { title: "로맨스", url: `/api/main/movie/genre/10749` },
  { title: "서부 영화", url: `/api/main/movie/genre/37` },
  { title: "모험·어드벤처", url: `/api/main/movie/genre/12` },
];
