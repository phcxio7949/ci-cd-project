import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Profile = ({ setUserObj, userObj }) => {
  const [newDisplayname, setnewDisplayname] = useState(userObj.name);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Logout = async () => {
    // userObj 초기화
    // try {
    //   setLoading(true);
    //   const res = await axios(`/user/${userObj}/logout`);
    //   if(res.data) {
    setUserObj();
    // 쿠키삭제
    //   }
    history.push("/");
    // } catch (e) {
    //   setError(e.response);
    //   console.log(e);
    // }
    // setLoading(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setnewDisplayname(value);
  };

  // fetchUser를 불러와서 유저를 갱신 시킬 것인지 고민
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(newDisplayname);
    const data = { name: newDisplayname, id: userObj._id };
    if (userObj.username !== newDisplayname) {
      try {
        setLoading(true);
        const res = await axios.post(`/user/update`, data);
        console.log("받아온 유저", res.data.newUser);
        setUserObj(res.data.newUser);
      } catch (e) {
        setError(e.response);
        console.log(e);
      }
      setLoading(false);
      history.push("/");
    }
  };

  if (loading)
    return (
      <div className="loadingBox">
        <div className="dim"></div>
        <div className="circle"></div>
      </div>
    );
  if (error) return <div className="statusBar">Error!</div>;

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayname}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={Logout}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
