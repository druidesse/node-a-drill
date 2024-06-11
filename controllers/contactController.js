const contactModel = require('../models/contactModel');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.getAllContacts();
    res.render("getAll", { contacts: contacts });
    //res.json(contacts);
    
    //2차
    //const users = [
    //    {name:'kim', email:'kim@asdf.com', phone:'123456822'},
    //    {name:'lee', email:'lee@asdf.com', phone:'96328541'}
    //]
    //res.render('getAll', {users: users});

    //1차
    //res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
};

exports.addContactForm = async (req, res) => {
  try{
    res.render('add');
  } catch (err) {
    console.error(err);
    res.status(500).send('추가 폼 경로 오류')
  }
};

exports.createContact = async (req, res) => {
  const { name, email, phone, address = '' } = req.body;

  // 필수 입력값 체크
  if (!name || !email || !phone) {
    return res.status(400).send('필수 입력값이 누락되었습니다.');
  }

  try {
    const newContact = await contactModel.createContact(name, email, phone, address);
    //res.status(201).json(newContact);
    res.status(201).redirect('/contacts');
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
};

// 연락처 상세 조회
exports.getContactById = async (req, res) => {
  const contact = await contactModel.getContactById(req.params.id);
  
  try{
    if (!contact) {
      return res.status(404).send('연락처가 존재하지 않습니다.');
    }
    res.render('update', { contact: contact });
  } catch (err) {
    console.error(err);
    res.status(500).send('업데이트 페이지 경로 오류')
  }
  
  /*try {
      const contact = await contactModel.getContactById(req.params.id);
      if (!contact) {
        return res.status(404).send('연락처가 존재하지 않습니다.');
      }
      res.json(contact);
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 오류');
    }*/
};

// 연락처 수정
exports.updateContact =  async (req, res) => {
    const { name, email, phone, address = '' } = req.body;
  
    // 필수 입력값 체크
    if (!name || !email || !phone) {
      return res.status(400).send('필수 입력값이 누락되었습니다.');
    }
  
    try {
      const updatedContact = { name, email, phone, address };
      const success = await contactModel.updateContact(req.params.id, updatedContact);
      if (!success) {
        return res.status(404).send('연락처가 존재하지 않습니다.');
      }
      res.redirect('/contacts');
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 오류');
    }
};

// 연락처 삭제
exports.deleteContact =  async (req, res) => {
    try {
      const success = await contactModel.deleteContact(req.params.id);
      if(success){
        confirm('정말로 삭제하시겠습니까?');
      }
      if (!success) {
        return res.status(404).send('연락처가 존재하지 않습니다.');
      }
      res.redirect('/contacts');
      //res.sendStatus(204); // No Content
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 오류');
    }
};

//module.exports = { getContactById, createContact }