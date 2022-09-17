const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// 세션 유지 사용자 불러오기
router.get("/", async (req, res, next) => {
  // console.log("/user 수신");
  // console.log(req.headers.authorization); // 토큰 저장위치
  passport.authenticate("jwt", { session: false }, (err, user) => {
    // console.log("jwt통과 복원객체", user);
    // console.log("req.user가 생김?", req.user); // 안생김.
    if (user) {
      res.send({ user });
    }
    next();
  })(req, res, next);
});

//회원가입
router.post("/join", async (req, res, next) => {
  //   console.log("/user/join 으로 수신");
  const { username, password } = req.body;

  try {
    // 기 가입자 확인
    await User.findOne({ username: username }).exec((err, data) => {
      if (data) {
        return res.status(400).send("이미 등록된 유저입니다");
      }
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({ username, password: hashedPassword });
    await createdUser.save();
    //바로 유저객체를 보내 회원가입 후 자동로그인 유도
    res.json(createdUser);
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

//로그인
router.post("/login", async (req, res, next) => {
  //   console.log("/user/login으로 수신");
  passport.authenticate("local", { session: false }, (err, user) => {
    // console.log("인증 후 가져온 유저", user);
    if (err || !user) return res.status(400).end();
    req.login(user, { session: false }, (error) => {
      if (error) {
        next(error);
      }
      const token = jwt.sign(
        {
          id: user.id,
        }, // 토큰에 입력할 private 값
        "jwt-secret-key", // 나만의 시크릿키
        { expiresIn: "30m" } // 토큰 만료 시간
      );
      delete user.password;
      console.log("비번 삭제후 유저", user);
      return res.json({ token, user });
    });
  })(req, res);
});

// router.delete("/:userId", async (req, res) => {
//   try {
//     await User.remove({
//       _id: req.params.postId,
//     });
//     res.json({ message: "유저아이디가 삭제되었습니다." });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: "삭제 실패" });
//   }
// });

//프로필 수정
router.post("/update", async (req, res) => {
  console.log("받아온것들", req.body.id, req.body.name);
  try {
    await User.updateOne(
      { _id: req.body.id },
      { $set: { username: req.body.name } }
    );
    const newUser = await User.findById(req.body.id);
    console.log("수정한 유저", newUser);
    return res.json({ newUser });
  } catch (err) {
    console.log(err);
    return res.json({ message: "업데이트 실패." });
  }
});

// router.get("/logout", (req, res) => {
//     console.log("/logout" + req.sessionID);
//     req.session.destroy(() => {
//         res.json({ message: true });
//     });
// });

module.exports = router;
