const express = require('express');
const router = express.Router();
const db = require('../lib/db.js');

// USER_COOKIE_KEY 변수를 정의합니다. 이는 쿠키의 이름으로 사용됩니다.
const USER_COOKIE_KEY = 'USER';  // 쿠키의 키를 'USER'로 설정

router.post('/signup', (req, res) => {
  const { id, username } = req.body;
  const query = 'SELECT user_id, user_name from data_shiregi where user_id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      // DB 연결 오류 발생 시, 캐시를 삭제하고 종료합니다.
      delete require.cache[require.resolve('../lib/db.js')];
      return;
    }
    
    // 결과가 없을 경우, 새 사용자로 등록합니다.
    else if (results == false) {
      const insertQuery = 'INSERT INTO data_shiregi (user_id, user_name) VALUES (?, ?)';
      db.query(insertQuery, [id, username], (err, results) => {
        if (err) {
          // 데이터베이스 삽입 중 오류 발생 시
          console.log(err);
          res.status(500).send('Server Error');
          return;
        }

        // 새 사용자 정보를 객체로 만듭니다.
        const newUser = { id, username };

        // 쿠키를 설정합니다. USER_COOKIE_KEY는 'USER'로 정의되어 있습니다.
        res.cookie(USER_COOKIE_KEY, JSON.stringify(newUser));
        
        // 메인 페이지로 리디렉션합니다.
        res.redirect('/');
      });
    } 
    
    // 유저 아이디가 이미 존재하는 경우, 에러 메시지를 반환합니다.
    else {
      res.status(400).send(`duplicate id: ${id}`);
      return;
    }
  });
});

module.exports = router;
