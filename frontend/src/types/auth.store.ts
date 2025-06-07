interface AuthStore {
  isAuth: null | boolean;
  setAuth: (isAuth: AuthStore["isAuth"]) => void;
}
