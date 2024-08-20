var express = require('express');
var router = express.Router();
const db = require('../lib/db');

// USER_COOKIE_KEY 변수를 정의합니다. 이는 쿠키에서 값을 읽을 때 사용됩니다.
const USER_COOKIE_KEY = 'USER';  // 쿠키 키로 'USER'를 사용

router.post('/login', (req, res) => {
  // 쿠키에서 USER_COOKIE_KEY로 저장된 쿠키 값을 가져옵니다.
  const username = req.cookies[USER_COOKIE_KEY];

  // 쿠키에 값이 없으면 로그인되지 않은 상태로 처리합니다.
  if (username) {
    const userData = JSON.parse(username);

    // SQL 쿼리에서 '?' 바인딩을 수정했습니다.
    let query = `SELECT user_id, user_name FROM data_shiregi WHERE user_id = ? AND user_name = ?`;
    db.query(query, [userData.id, userData.username], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Server Error');
        return;
      }

      // DB 쿼리 결과가 존재할 경우 로그인을 성공으로 처리합니다.
      if (results.length > 0) {
        res.status(200).send(`
          <a href="/logout">Log Out</a>
          <h1>id: ${userData.id}, username: ${userData.username}</h1>
        `);
      } else {
        res.status(400).send('Invalid credentials.');
      }
    });
  } else {
    // 쿠키가 없을 경우 로그인 페이지로 이동하도록 처리합니다.
    res.status(200).send(`
      <a href="/login" class="btn btn-primary">Log In</a>
      <a href="/signup" class="btn btn-primary">Sign Up</a>
      <h1>Not Logged In</h1>
    `);
  }
});

module.exports = router;
