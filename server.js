const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true})) 

const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb+srv://bohyun:chlqhbo3278@boilerplate.kfozn.mongodb.net/?retryWrites=true&w=majority', function(에러, client){
    if (에러) return console.log(에러);

    db = client.db('server');

    app.listen('8080', function(){
      console.log('listening on 8080')
    });
  });

app.get('/', function(req,res){
    // res.send('하이');
    res.sendFile(__dirname + '/index.html')
});

app.get('/write', function(req,res){
    res.sendFile(__dirname + '/write.html')
});

app.post('/add', function(req,res){
    db.collection('counter').findOne({ name : 'post_count' }, function(err,result){
        
        let total_post = result.totalPost;
        db.collection('post').insertOne({ _id : total_post + 1, 제목 : req.body.title, 내용 : req.body.content},(err, result) => {
            res.send('저장이 완료되었습니다');
            db.collection('counter').updateOne({ name : "post_count" },{ $inc : {totalPost:1} }, function(err,result){
                if(err) return console.log(err);
            });
        });

    });
});

app.get('/list', function(req,res){
    db.collection('post').find().toArray(function(err,result){
        res.render('list.ejs', { posts : result });
    });
})

app.delete('/delete', function(req,res){
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body, function(err,result){
        console.log('delete complete');
        res.status(200).send({ message : '성공했습니다' });
    });
});