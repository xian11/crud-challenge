# CRUD

codingapple

- node.js
- mongodb
- express

---

## 강의 정리

- 검색 기능

  - normal) mongodb > indexes > create index >
    find({$text : { $search: req.query.value }})

  - 한국어친화적인덱스) search indexes > create > refine language > lucene.korean 선택

### 초기설정

- express 라이브러리 설치

```
npm init
- entry point만 server.js로 설정
- npm install express
```

- nodemon 설치

```
npm install -g nodemon
```

- bodyparser

```
app.use(express.urlencoded({extended: true}))
```

- mongodb

```
npm install mongodb

mongodb atlas > database > connect your application > copy link

var db;
MongoClient.connect('mongodb+srv://bohyun:chlqhbo3278@boilerplate.kfozn.mongodb.net/?retryWrites=true&w=majority', function(에러, client){
    if (에러) return console.log(에러);

    db = client.db('server');

    app.listen('8080', function(){
      console.log('listening on 8080')
    });
  })
```

- html에서 put/delete 요청하려면

```
npm install method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

<form action="/add?_method=PUT" method="POST">
```

---

- 보안기능

```
npm install passport passport-local express-session

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
```

---

- html 초기설정

```
!, html:5,  or
bootstrap starter template
```

- ejs

```
npm install ejs
app.set('view engine', 'ejs');
!@#$%.ejs 로 이름바꾸기 후 'views'폴더 안으로
```

- 환경변수 관리

```
npm install dotenv
require('dotenv').config()
.env 파일생성 후 환경변수 모두 옮기기
```

-router 관리하기

```
새로운폴더 만들고

var router = require('express').Router();
이안에 코드를 넣기
router.get('/shop/shirts'...처럼 router로 시작
module.exports = router;

원래 코드쓰던 파일에 아래 미들웨어
app.use('/',require('./routes/----.js'))
```
