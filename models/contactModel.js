require('dotenv').config(); // .env 파일 로드
const mysql2 = require('mysql2/promise');
const dbConnect = require('../config/dbConnect');

/*// 테이블 생성 SQL 쿼리
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255)
  )
`;

//테이블 제작, 하단에서 주석처리
const createTable = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
    await connection.execute(createTableQuery);
    console.log('Contacts 테이블이 생성되었습니다.');
    connection.end();
  } catch (err) {
    console.error('테이블 생성 중 오류가 발생했습니다:', err);
  }
};

module.exports = {
  // 연락처 추가, 수정, 삭제, 조회 함수들을 여기에 작성할 수 있습니다.
  //createTable,
};
*/

//조회, 생성
const contactModel = {
  getAllContacts: async () => {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM contacts');
    return rows;
  },

  createContact: async (name, email, phone, address) => {
    const connection = await dbConnect();
    const [result] = await connection.execute(
      'INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address]
    );
    const newContact = { id: result.insertId, name, email, phone, address };
    return newContact;
  },

  // 연락처 상세 조회
  getContactById: async (id) => {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM contacts WHERE id = ?', [id]);
    return rows[0];
  },

  // 연락처 수정
  updateContact: async (id, updatedContact) => {
    const connection = await dbConnect();
    const [result] = await connection.execute(
      'UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [updatedContact.name, updatedContact.email, updatedContact.phone, updatedContact.address, id]
    );
    return result.affectedRows > 0;
  },

  // 연락처 삭제
  deleteContact: async (id) => {
    const connection = await dbConnect();
    const [result] = await connection.execute('DELETE FROM contacts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};


module.exports = contactModel;
