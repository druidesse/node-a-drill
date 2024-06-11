const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// 연락처 전체 조회
router.get('/', contactController.getAllContacts);

//추가 폼 열기
router.get('/add', contactController.addContactForm);

// 새 연락처 생성
router.post('/add', contactController.createContact);

// 연락처 상세 조회
router.get('/:id', contactController.getContactById);

// 연락처 수정
router.put('/:id', contactController.updateContact);

// 연락처 삭제
router.delete('/:id', contactController.deleteContact);


module.exports = router;