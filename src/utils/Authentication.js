import { getStorageItem } from "../utils/storage/storage";

class Authentication {
  constructor() {
    const isUserLoggedIn = getStorageItem("isUserLoggedIn");
    this.authenticated = !!isUserLoggedIn;
  }

  login(callback) {
    this.authenticated = true;
    callback();
  }

  logout(callback) {
    this.authenticated = false;
    callback();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Authentication();
