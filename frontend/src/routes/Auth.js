import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { setCookie } from "../cookies";

const Auth = ({ setUserObj }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };

    if (newAccount) {
      console.log("회원가입");
      try {
        setLoading(true);
        const res = await axios.post("user/join", data); // 가입정보 서버송신 > db저장 > 유저객체 복원 > 프론트 수신(res)
        setUserObj(res.data); // 유저상태 업데이트
      } catch (err) {
        err.response && setError(err.response.data);
      }
      setLoading(false);
    } else {
      console.log("로그인");
      try {
        setLoading(true);
        const res = await axios.post("/user/login", data); // 로그인정보 서버송신 > db조회 > 유저객체 복원 > 프론트 수신(res)
        setCookie("myToken", res.data.token);
        setUserObj(res.data.user); // 유저상태 업데이트
      } catch (err) {
        err.response && setError(err.response.data);
      }
      setLoading(false);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const SocialLogin = async (e) => {
    const res = await axios.post("/auth/google/callback");
    console.log(res.data);
  };

  if (loading)
    return (
      <div className="loadingBox">
        <div className="dim"></div>
        <div className="circle"></div>
      </div>
    );
  //   if (error) return <div className="statusBar">Error!</div>;

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <form onSubmit={onSubmit} className="container">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Passoword"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <span className="errMsg"> {error} </span>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          className="authInput authSubmit"
        />
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}{" "}
      </span>
      <div className="authBtns">
        <button onClick={SocialLogin} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={SocialLogin} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
