const mysql = require('mysql');
const db = mysql.createConnection({
  host: '10.12.9.4',  // IP 주소만 기재
  port: 3307,         // 포트 번호는 따로 설정
  user: 'StudyHSK',
  password: 'HSK6265!',
  database: 'java_chat',
});

// MySQL 서버에 연결
db.connect((err) => {
  if (err) {
    console.error('MariaDB 연결 오류: ', err.stack);
    return;
  }

  console.log('MariaDB에 연결되었습니다. 연결 ID: ' + db.threadId); // db.threadId로 수정
});

// 쿼리 예제
// db.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
//   if (error) throw error;
//   console.log('쿼리 결과: ', results[0].solution);
// });

// 연결 종료
// db.end();

module.exports = db;
