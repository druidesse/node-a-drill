require('dotenv').config(); // .env 파일 로드
const mysql = require('mysql2/promise');

let pool; // 연결 풀 인스턴스를 저장할 변수

const dbConnect = async () => {
  try {
    pool = pool ?? await mysql.createPool({ // 풀이 없으면 새로 생성, 있으면 기존 풀 사용
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true, // 모든 연결이 사용 중일 때 새 연결이 생길 때까지 대기
      connectionLimit: 10, // 최대 연결 수 (필요에 따라 조정)
      queueLimit: 0 // 대기열 제한 (0: 무제한)
    });
    console.log('DB CONNECTED');
    return pool;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = dbConnect;