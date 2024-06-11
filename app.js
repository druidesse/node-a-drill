//모듈 불러오기 -> db 설정, 연결 -> body parser 미들웨어 설정 
//-> 라우터 설정 -> 라우터 핸들러 설정 -> 서버 실행

const express = require('express');
const app = express();

const exphbs = require("express-handlebars");
const hbs = exphbs.create({
  partialsDir: __dirname + '/views/partials/'
});

const contactModel = require('./models/contactModel');

const bodyParser = require('body-parser');


const methodOverride = require('method-override');

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Body Parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// 라우터 설정
const router = express.Router();
app.use('/contacts', require('./routes/contactRoutes'));

//현재 /contact 경로로 접속해야만 보임.

// 라우트 핸들러 설정
/*app.get("/", (req, res) => {
  res.status(200).render("home");
});*/

// 서버 실행
app.listen(3000, () => {
  console.log('서버 실행 중');
});