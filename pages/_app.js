import React, { useEffect, useMemo, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import "../scss/global.scss";
import { getToken, removeToken, setToken } from "../api/token";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  /**
   * autenticación
   */
  const login = (token) => {
    setToken(token);
    setAuth({ token, idUser: jwtDecode(token).id });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  if (auth === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider value={authData}>
      <>
        <Component {...pageProps} />

        <ToastContainer
          position="top-right"
          autoclose="3000"
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </>
    </AuthContext.Provider>
  );
}

export default MyApp;
