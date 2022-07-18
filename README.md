# CRUD

codingapple

- node.js
- mongodb
- express

---

## 강의 정리

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

---

- html 초기설정

```
!, html:5,  or
bootstrap starter template
```
