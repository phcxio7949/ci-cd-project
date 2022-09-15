import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, val, option) => {
  return cookies.set(name, val, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};
