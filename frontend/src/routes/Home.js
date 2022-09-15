import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";
import axios from "axios";

const initialV = [
  { id: 0, body: "ex 0", userId: 0, creator: "me" },
  { id: 1, body: "ex 1", userId: 0, creator: "me" },
];

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 첫 렌더 & 갱신 게시글 불러오기(GET:/posts)
  const fetchData = async () => {
    console.log("게시글갱신");
    try {
      setLoading(true);
      const result = await axios.get("/post");
      // const result = await axios.get("http://localhost:3005/board");
      console.log("전체게시물", result.data.posts);
      setNweets(result.data.posts);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <NweetFactory
        fetchData={fetchData}
        userObj={userObj}
        setNweets={setNweets}
        nweets={nweets}
      />
      <div style={{ marginTop: 30 }}>
        {!!nweets &&
          nweets.map((nweet) => (
            <Nweet
              key={nweet._id}
              nweetObj={nweet}
              isOwner={nweet.userId === userObj._id}
              setNweets={setNweets}
              nweets={nweets}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
