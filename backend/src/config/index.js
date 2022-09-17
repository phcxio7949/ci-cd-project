const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const localConfig = { usernameField: "username", passwordField: "password" };

const localVerifier = async (username, password, done) => {
  console.log(username, password);
  console.log("패스포트 검증부 진입");
  try {
    const user = await User.findOne({ username: username });
    console.log(user, "검증부 내 유저객체 복원");
    // 존재하지 않는 유저일 때
    if (!user) {
      return done(null, false, { reason: "존재하지 않는 사용자입니다." }); //라우터의 err로 전달
    }
    // console.log(password, typeof password);
    // console.log(user.password, typeof user.password);
    // console.log(user.password.toString());
    // console.log(password === user.password.toString());
    const result = await bcrypt.compare(password, user.password);
    console.log("Result", result);
    // 비밀번호가 불일치할 때
    if (!result) {
      return done(null, false, { reason: "비밀번호가 일치하지 않습니다" });
    }
    // 검증 통과 후 user객체 반환
    return done(null, user);
  } catch (error) {
    // 서버측 실패, 즉, db와 통신이 실패할 때
    console.error(error);
    return done(error);
  }
};

const jwtConfig = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "jwt-secret-key",
};

const jwtVerift = async (payload, done) => {
  console.log("jwt 검증부 진입");
  console.log("복호화한 토큰 :", payload);
  let user;
  try {
    user = await User.findOne({ id: payload.id });
    // 존재하지 않는 유저일 때
    console.log("토큰에서 검증한 유저", user);
    if (!user)
      return done(null, false, { reason: "존재하지 않는 사용자입니다." });
  } catch (e) {
    // 서버측 실패, 즉, db와 통신이 실패할 때
    console.error(error);
    return done(e);
  }
  return done(null, user);
};

module.exports = () => {
  passport.use("local", new LocalStrategy(localConfig, localVerifier));
  passport.use("jwt", new JWTStrategy(jwtConfig, jwtVerift));
};
