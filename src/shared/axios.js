import axios from "axios";

//이미지포함 불러오는 baseurl
export const _baseURL = "https://image.tmdb.org/t/p/w500/";
export const _ytbbaseURL = "https://www.youtube.com/watch?v=";

// 영화 db요청 만들기 위한 base url
export const _axios = axios.create({
  baseURL: "http://13.124.57.131:8080/",
});
// http://13.124.57.131:8080/

export const axiosTMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

// export default instance;
