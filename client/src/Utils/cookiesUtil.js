import Cookies from "js-cookie";

export const getCookies = () => {
    const Cookie = sessionStorage.getItem("authenticatedUser");
    return Cookie;
};