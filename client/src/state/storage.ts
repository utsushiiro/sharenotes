import { User } from "./auth/types";

/**
 * Testing for availability
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 * @param type
 */
const storageAvailable = (type: "localStorage" | "sessionStorage") => {
  let storage;
  try {
    storage = window[type];
    const keyForTest = "__storage_test__";
    storage.setItem(keyForTest, keyForTest);
    storage.removeItem(keyForTest);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
};

const getLoginUser = () => {
  if (storageAvailable("localStorage")) {
    const userJson = localStorage.getItem("loginUser");
    if (userJson !== null) {
      return JSON.parse(userJson) as User;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const setLoginUser = (user: User) => {
  if (storageAvailable("localStorage")) {
    localStorage.setItem("loginUser", JSON.stringify(user));
  }
};

const deleteLoginUser = () => {
  if (storageAvailable("localStorage")) {
    localStorage.removeItem("loginUser");
  }
};

export default {
  getLoginUser,
  setLoginUser,
  deleteLoginUser
};
