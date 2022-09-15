import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Nweet = ({ nweetObj, isOwner, setNweets, nweets }) => {
  const [editMode, setEditmode] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.body);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onEditToggle = () => {
    setEditmode((prev) => !prev);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewNweet(value);
  };

  // 게시글 수정(POST:post/id)
  const onSubmit = async () => {
    console.log("수정");
    // 서버에 postID와 수정데이터를 전달
    // await axios.post(`/post/${nweetObj.id}`, newNweet);
    if (!newNweet || !newNweet.trim()) {
      return alert("게시글을 입력하세요");
    }
    const data = { id: nweetObj._id, body: newNweet };
    try {
      setLoading(true);
      const result = await axios.post(`/post/update`, data);
      console.log(result.data);
      const restNweets = nweets.filter((v) => v._id !== nweetObj._id);
      setNweets([result.data.updatedPost, ...restNweets]);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
    setNewNweet("");
    setEditmode(false);
  };

  // 게시글 삭제(DELETE:post/id)
  const onDelete = async () => {
    console.log("삭제");
    // 서버에 postID를 전달
    try {
      setLoading(true);
      const result = await axios.delete(`/post/${nweetObj._id}`);
      if (result.data.message === "삭제완료") {
        setNweets(nweets.filter((v) => v._id !== nweetObj._id));
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
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
    <div className="nweet">
      {editMode ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={onEditToggle} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          {/* <div className="nweet_title">{nweetObj.title}</div> */}
          <div className="nweet_body">{nweetObj.body}</div>
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onEditToggle}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
