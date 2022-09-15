import React, { useState, useEffect } from "react";
import AppRouter from "./components/Router";
import axios from "axios";
import { getCookie } from "../src/cookies";

// const fakeUser = { id: 0, name: "hs" };

function App() {
  const [userObj, setUserObj] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    console.log("유저토큰 재발급");
    console.log("테스트5");
    try {
      setLoading(true);

      const result = await axios({
        method: "get",
        url: "/user",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("myToken")}`,
        },
      });
      if (result.data.user) {
        setUserObj(result.data.user);
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  // 유저 불러오기
  useEffect(() => {
    console.log("첫 렌더, 새로고침 시 유저 불러오기");
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="loadingBox">
        <div className="dim"></div>
        <div className="circle"></div>
      </div>
    );
  // if (error) return <div className="statusBar">Error!</div>;

  return (
    <AppRouter
      setUserObj={setUserObj}
      userObj={userObj}
      isLoggedIn={Boolean(userObj)}
    />
  );
}

export default App;
