const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    await Board.find()
      .sort({ _id: -1 })
      .exec((err, posts) => {
        if (!posts) {
          return res.status(404).json({ message: "post를 찾을수 없습니다." });
        }
        res.json({ posts });
      });
  } catch (error) {
    console.log(err);
    res.json({ message: "db연결 에러" });
  }
});

router.post("/add", async (req, res) => {
  console.log("받은 데이터", req.body);
  try {
    const newPost = new Board({
      userId: req.body.id, //passport id 해야 가능....
      body: req.body.body,
    });
    await newPost.save();
    console.log("생성한 게시글", newPost);
    return res.send({ newPost });
  } catch (err) {
    console.log(err);
    res.json({ message: "post 저장에 실패했습니다." });
  }
});

router.delete("/:postId", async (req, res) => {
  console.log("삭제", req.params.postId);
  try {
    await Board.deleteOne({
      _id: req.params.postId,
    });
    return res.json({ message: "삭제완료" });
  } catch (err) {
    console.log(err);
    return res.json({ message: "post가 삭제되지 않았습니다." });
  }
});

router.post("/update", async (req, res) => {
  console.log("받아온것들", req.body.id, req.body);
  try {
    await Board.updateOne(
      { _id: req.body.id }, // _id로 찾아서
      { $set: { body: req.body.body } } // 덮어쓰기 $set
    );
    const updatedPost = await Board.findById(req.body.id);
    console.log("업데이트 한 객체", updatedPost);
    return res.json({ updatedPost });
  } catch (err) {
    console.log(err);
    res.json({ message: "post가 수정되지 않았습니다." });
  }
});

// router.post("/getBoardList", async (req, res) => {
//     try {
//         const _id = req.body._id;
//         const board = await Board.find({ writer: _id }, null, {
//             sort: { createdAt: -1 }
//         });
//         res.json({ list: board });
//     } catch (err) {
//         console.log(err);
//         res.json({ message: false });
//     }
// });

module.exports = router;
