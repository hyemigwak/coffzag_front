//쿠키생성
const setCookie = (name, value, exp = 1) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 24);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

//쿠키삭제
const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

//쿠키 가져오기
const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split(";  " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  } else if (parts === "; ") {
    return undefined;
  } else {
    return parts.pop().split("=")[1];
  }
};

export { setCookie, deleteCookie, getCookie };
