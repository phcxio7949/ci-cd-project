import React, { useState } from "react";
import axios from "axios";

const NweetFactory = ({ userObj, fetchData, setNweets, nweets }) => {
  const [nweet, setNweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!nweet || !nweet.trim()) {
      return alert("게시글을 입력하세요");
    }
    const data = { id: userObj._id, body: nweet };
    try {
      setLoading(true);
      const result = await axios.post("/post/add", data);
      console.log("받아온 새게시물", result.data.newPost);
      setNweets([result.data.newPost, ...nweets]);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
    setNweet("");
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNweet(value);
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
    </form>
  );
};

export default NweetFactory;
